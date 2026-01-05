from fastapi import FastAPI
from pydantic import BaseModel
from prediction import predict_for_web

# Create FastAPI app
app = FastAPI(title="Drug–Excipient Compatibility API")

# Input format from frontend
class PredictionInput(BaseModel):
    drug_name: str
    excipient_name: str
    smiles: str

# Health check (important for Render)
@app.get("/")
def root():
    return {"status": "API is running"}

# Prediction endpoint
@app.post("/predict")
def predict(data: PredictionInput):
    return predict_for_web(
        drug_name=data.drug_name,
        excipient_name=data.excipient_name,
        smiles=data.smiles
    )
