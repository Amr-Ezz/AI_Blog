"use client";
import Button from "@/app/shared/Button/Button";
import React, { useState } from "react";
import BlogCard from "../BlogCard/BlogCard";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Blog = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerationText = async () => {
    if (!prompt.trim()) {
      setError("please enter a prompt");
      return;
    }
    setLoading(true);
    setError(null);
    setGeneratedText(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData.error || `HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setGeneratedText(data.content);
    } catch (err: any) {
      console.log(err, "Error fetching Ai response");
      setError(err.message || "failed to generate content");
      setGeneratedText(null);
    } finally {
      setLoading(false);
    }
  };
  const useGeneratedText = () => {
    if (generatedText) {
      setPostContent(generatedText);
    }
  };
  const toggleFormButton = () => {
    setShowForm((prev) => !prev);
    if (showForm) {
      setPostTitle("");
      setPostContent("");
    }
  };
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const [blogPost, setBlogPost] = useState<BlogPost[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      alert("fill out both title and content");
    }
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title: postTitle,
      content: postContent,
      date: new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setBlogPost((prev) => [...prev, newBlog]);
    setPostTitle("");
    setPostContent("");
    setPrompt("");
    setGeneratedText(null);
    setError(null);
    setShowForm(false);
  };
  return (
    <div className="flex-col bg-[#27293d] p-8 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.2)] text-[#00c6ff]">
      <div className="justify-self-end">
        <Button showForm={showForm} onClick={toggleFormButton} />
      </div>
      {showForm ? (
        <form id="blog-post-form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="post-title"
              className="block mb-2 font-bold text-[#00c6ff]"
            >
              Title
            </label>
            <input
              type="text"
              id="post-title"
              value={postTitle}
              required
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-3 rounded-md border border-[#3a3c53] bg-[#1e1e2f] text-gray-200 text-base"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="post-content"
              className="block mb-2 font-bold text-[#00c6ff]"
            >
              Content
            </label>
            <textarea
              id="post-content"
              required
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full p-3 rounded-md border border-[#3a3c53] bg-[#1e1e2f] text-gray-200 text-base min-h-[200px] resize-y"
            ></textarea>
          </div>

          <div className="mb-6">
            <button
              type="button"
              id="ai-generate-button"
              className="bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer text-base font-bold transition duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 inline-block no-underline"
            >
              Generate Content with AI ✨
            </button>

            <div
              id="ai-prompt-area"
              className="mt-4 p-4 bg-[#1e1e2f] rounded-md border border-[#3a3c53]"
            >
              <label
                htmlFor="ai-prompt"
                className="block mb-2 font-bold text-[#00c6ff]"
              >
                Enter a topic or prompt for AI:
              </label>
              <input
                type="text"
                id="ai-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., benefits of remote work"
                className="w-[calc(70%-10px)] mr-4 p-3 rounded-md border border-[#3a3c53] bg-[#1e1e2f] text-gray-200 text-base"
              />
              <button
                type="button"
                id="ai-submit-prompt"
                onClick={handleGenerationText}
                disabled={loading}
                className="bg-[#00c6ff] text-[#1e1e2f] px-6 py-3 rounded-md cursor-pointer text-base font-bold transition duration-300 ease-in-out hover:bg-blue-400 hover:scale-105 inline-block no-underline"
              >
                {loading ? 'generating...': 'generate'}
              </button>
            </div>
              {error && (
              <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded-md">
                <p><strong className="font-semibold">Error:</strong> {error}</p>
              </div>
            )}
            {generatedText && (
              <div className="mt-4 p-4 bg-[#27293d] border border-[#3a3c53] rounded shadow">
                <h4 className="font-semibold mb-2 text-white">Generated Content Preview:</h4>
                <p className="text-gray-300 whitespace-pre-wrap">{generatedText}</p> {/* Use pre-wrap to preserve formatting */} 
                <button
                  type="button"
                  onClick={useGeneratedText}
                  className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer text-sm font-bold transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105"
                >
                  Use This Content
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
             <button
              type="submit"
              className="bg-[#00c6ff] text-[#1e1e2f] px-6 py-3 rounded-md cursor-pointer text-base font-bold transition duration-300 ease-in-out hover:bg-blue-400 hover:scale-105 inline-block no-underline"
            >
              Publish Post
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPost.length > 0 ? (
            blogPost.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                content={post.content}
                date={post.date}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full py-10">
              No blogs yet! Click "Create New Blog" to get started.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
