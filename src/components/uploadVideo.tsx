import React, { useState } from "react";
import { FaVideo, FaImage } from "react-icons/fa";
import { api } from "../config/axios";
import { useNavigate } from "react-router-dom";

const UploadForm: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) return alert("Ikkala faylni ham tanlang");

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await api.post("videos/upload", formData);
      console.log("Server javobi:", response.data);
      alert("Upload muvaffaqiyatli!");
    } catch (err) {
      console.log(err);

      console.error(err);
      alert("Uploadda xatolik yuz berdi");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-[500px] mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 rounded border border-gray-300 text-lg"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 rounded border border-gray-300 h-32 resize-none text-lg"
      />
      <div className="flex flex-row gap-6">
        <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-gray-400 p-5 rounded-lg hover:border-blue-500 w-1/2 justify-center">
          <FaVideo className="text-3xl text-gray-600" />
          <span className="truncate text-lg">
            {videoFile ? videoFile.name : "Upload Video"}
          </span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          />
        </label>

        <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-gray-400 p-5 rounded-lg hover:border-green-500 w-1/2 justify-center">
          <FaImage className="text-3xl text-gray-600" />
          <span className="truncate text-lg">
            {thumbnailFile ? thumbnailFile.name : "Upload Thumbnail"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      <button
        type="submit"
              className="bg-blue-500 text-white p-3 rounded text-lg hover:bg-blue-600 transition"
              onClick={() => navigate('/')}
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
