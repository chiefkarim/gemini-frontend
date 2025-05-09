"use client";

export function ChatSesssionsToolBar() {
  const handleCreateChatSession = () => {};
  return (
    <div className="w-full">
      <button
        className="hover:cursor-pointer"
        onClick={handleCreateChatSession}
      >
        new chat
      </button>
      {/* TODO: search in chat sessions  */}
    </div>
  );
}
