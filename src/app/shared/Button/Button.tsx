"use client";
import React, { useState } from "react";

interface ButtonProps {
  showForm: boolean;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ showForm, onClick }) => {
  return (
    <button
      className="bg-[#00c6ff] text-[#1e1e2f] border-none px-6 py-3 rounded-md cursor-pointer text-base font-bold transition duration-300 ease-in-out hover:bg-blue-400 hover:scale-105 inline-block no-underline"
      onClick={onClick}
    >
      {showForm ? "Back To Dashboard" : "Create New Blog"}
    </button>
  );
};

export default Button;
