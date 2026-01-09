import { db } from "./firestore";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "@/services/firebase";

/**
 * Count unique visitors (once per user)
 */
export async function registerVisitor() {
  const user = auth.currentUser;
  if (!user) return;

  const visitorRef = doc(db, "visitors", user.uid);
  const globalRef = doc(db, "analytics", "global");

  const snap = await getDoc(visitorRef);

  if (!snap.exists()) {
    await setDoc(visitorRef, {
      firstSeen: serverTimestamp(),
    });

    await setDoc(
      globalRef,
      { totalVisitors: increment(1) },
      { merge: true }
    );
  }
}

/**
 * Update analytics after successful prediction
 */
export async function updateAnalytics(result: {
  prediction: string;
  risk_level: string;
}) {
  const globalRef = doc(db, "analytics", "global");

  const updates: any = {
    totalPredictions: increment(1),
  };

  if (result.prediction === "Compatible") {
    updates.compatible = increment(1);
  } else {
    updates.nonCompatible = increment(1);
  }

  if (result.risk_level === "Low") {
    updates.lowRisk = increment(1);
  } else if (result.risk_level === "Medium") {
    updates.mediumRisk = increment(1);
  } else {
    updates.highRisk = increment(1);
  }

  await setDoc(globalRef, updates, { merge: true });
}

/**
 * Fetch analytics for dashboard
 */
export async function fetchAnalytics() {
  const globalRef = doc(db, "analytics", "global");
  const snap = await getDoc(globalRef);

  if (!snap.exists()) {
    return {
      totalPredictions: 0,
      compatible: 0,
      nonCompatible: 0,
      lowRisk: 0,
      mediumRisk: 0,
      highRisk: 0,
      totalVisitors: 0,
    };
  }

  return snap.data();
}
