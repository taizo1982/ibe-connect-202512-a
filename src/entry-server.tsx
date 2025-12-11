import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import "./index.css";

export async function render() {
  return renderToString(<App />);
}
