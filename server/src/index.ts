import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 환경 변수 로드 (가장 먼저 실행)
dotenv.config();

import { supabase } from "./supabase";

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "Book Recommendation API Server" });
});

// API 라우트
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Supabase 테스트 라우트
app.get("/api/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("books").select("*").limit(1);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Supabase connection successful", data });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to Supabase" });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
