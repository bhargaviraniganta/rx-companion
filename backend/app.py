from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from prediction import predict_for_web

# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(title="Drug–Excipient Compatibility API")

# ============================================================
# CORS CONFIGURATION
# (Required so Netlify frontend can call this API)
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # open for now (safe for demo/student project)
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# REQUEST MODEL
# ============================================================

class PredictionInput(BaseModel):
    drug_name: str
    excipient_name: str
    smiles: str

# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():
    return {"status": "API is running"}

# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict(data: PredictionInput):
    result = predict_for_web(
        drug_name=data.drug_name,
        excipient_name=data.excipient_name,
        smiles=data.smiles
    )

    if result.get("status") == "error":
        raise HTTPException(status_code=400, detail=result["message"])

    return result
