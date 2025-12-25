import React, { useState, useEffect, useRef } from "react";
import { Search, Database, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { drugDatabase, DrugEntry, getDrugCount } from "@/data/drugDatabase";
import { Badge } from "@/components/ui/badge";

const DatabaseViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedIndex, setMatchedIndex] = useState<number | null>(null);
  const [sortField, setSortField] = useState<keyof DrugEntry>("drugName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Map<number, HTMLTableRowElement>>(new Map());

  // Sort data
  const sortedData = [...drugDatabase].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc" 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    }
    return sortDirection === "asc" 
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  // Filter data
  const filteredData = sortedData.filter((entry) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.drugName.toLowerCase().includes(query) ||
      entry.smilesCode.toLowerCase().includes(query) ||
      entry.excipient.toLowerCase().includes(query)
    );
  });

  // Find first match and scroll to it
  useEffect(() => {
    if (searchQuery.trim() && filteredData.length > 0) {
      const firstMatchId = filteredData[0].id;
      setMatchedIndex(firstMatchId);
      
      // Scroll to matched row
      setTimeout(() => {
        const rowElement = rowRefs.current.get(firstMatchId);
        if (rowElement && tableRef.current) {
          rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else {
      setMatchedIndex(null);
    }
  }, [searchQuery, filteredData]);

  const handleSort = (field: keyof DrugEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: keyof DrugEntry }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Drug-Excipient Database
          </h1>
        </div>
        <p className="text-muted-foreground">
          Browse and search the pharmaceutical compound database
        </p>
      </div>

      <Card className="border-border shadow-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Database Records</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {getDrugCount()} entries
              </Badge>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drugs, SMILES, or excipients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredData.length} matching records
            </p>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={tableRef}
            className="overflow-auto max-h-[600px] border-t border-border"
          >
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0 z-10">
                <tr>
                  <th 
                    className="text-left py-3 px-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1">
                      SNO <SortIcon field="id" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("drugName")}
                  >
                    <div className="flex items-center gap-1">
                      Drug Name <SortIcon field="drugName" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors min-w-[300px]"
                    onClick={() => handleSort("smilesCode")}
                  >
                    <div className="flex items-center gap-1">
                      SMILES Code <SortIcon field="smilesCode" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("excipient")}
                  >
                    <div className="flex items-center gap-1">
                      Excipient <SortIcon field="excipient" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
                  <tr
                    key={entry.id}
                    ref={(el) => {
                      if (el) rowRefs.current.set(entry.id, el);
                    }}
                    className={`
                      border-b border-border/50 transition-colors
                      ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                      ${matchedIndex === entry.id ? "!bg-accent ring-2 ring-primary ring-inset" : "hover:bg-muted/40"}
                    `}
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {entry.id}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {entry.drugName}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground font-mono text-xs break-all">
                      {entry.smilesCode}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {entry.excipient}
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-muted-foreground">
                      No records found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default DatabaseViewer;
