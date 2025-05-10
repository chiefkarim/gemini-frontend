"use client";

import { useContext } from "react";
import { ChatContext } from "./contexts";
import { ChatSesssionsToolBar } from "./chat-side-toolbar";
import { updateChatSession } from "@/app/actions/update-chat-session";
import { deleteChatSession } from "@/app/actions/delete-chat-session";

//TODO: add loaing error success states
export function ChatSesssions() {
  const { chat, updateChat, currentChat, setCurrentChat } =
    useContext(ChatContext);
  const handleEditTitle = async (idx: number, title: string, id: string) => {
    try {
      const newtitle = await updateChatSession({ id, title });
      if (newtitle instanceof Response) {
        throw new Error(newtitle.statusText);
      } else {
        updateChat((oldchat) => {
          const newchat = [...oldchat];
          newchat[idx].title = newtitle.title;
          return newchat;
        });
      }
    } catch (error) {
      console.error("Error while editing title", error);
    }
  };
  const handleDeleteChatSession = async (id: string, index: number) => {
    try {
      const response = await deleteChatSession({ id });
      if (!response.success) {
        throw new Error(response.message);
      } else {
        updateChat((oldchat) => {
          const newchat = [...oldchat];
          newchat.splice(index);
          return newchat;
        });
      }
    } catch (error) {
      console.error("Error while deleting chat session", error);
    }
  };

  return (
    <div className="w-fit flex flex-col max-w-sm sm:max-w-sm  p-2">
      <ChatSesssionsToolBar />
      <div className="outline-1 h-full">
        {chat.map((item, index) => (
          <div
            className={
              "p-2 flex  justify-between" +
              (index === currentChat ? " bg-gray-200" : "")
            }
            key={item.id}
          >
            <p
              className="text-gray-950  hover:cursor-pointer"
              onClick={() => setCurrentChat(index)}
            >
              {item.title}
            </p>
            <button
              onClick={() =>
                (
                  document.getElementById(item.id) as HTMLDialogElement
                )?.showModal()
              }
              className="text-gray-950 outline-1 ml-2 px-2 hover:cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteChatSession(item.id, index)}
              className="text-gray-950 outline-1 ml-2 px-2 hover:cursor-pointer"
            >
              Delete
            </button>

            <dialog
              id={item.id}
              className="backdrop:bg-black/50 p-6 rounded-xl shadow-xl w-[300px] open:flex open:items-center open:justify-center translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
            >
              <form
                method="dialog"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.elements.namedItem(
                    "newTitle",
                  ) as HTMLInputElement;
                  handleEditTitle(index, input.value, item.id);
                }}
              >
                <h2 className="text-lg font-semibold mb-2">Edit title</h2>
                <input
                  type="text"
                  name="newTitle"
                  className="w-full border rounded px-3 py-2 mb-4"
                  placeholder="Nouveau titre"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      (
                        document.getElementById(item.id) as HTMLDialogElement
                      )?.close()
                    }
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() =>
                      (
                        document.getElementById(item.id) as HTMLDialogElement
                      )?.close()
                    }
                  >
                    Submit
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
