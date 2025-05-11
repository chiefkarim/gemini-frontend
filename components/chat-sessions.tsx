"use client";

import { useContext, useState, useTransition } from "react";
import { ChatContext } from "./contexts";
import { ChatSesssionsToolBar } from "./chat-side-toolbar";
import { updateChatSession } from "@/app/actions/update-chat-session";
import { deleteChatSession } from "@/app/actions/delete-chat-session";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { start } from "repl";

export function ChatSesssions() {
  const { chat, updateChat, currentChat, setCurrentChat } =
    useContext(ChatContext);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleEditTitle = async (idx: number, title: string, id: string) => {
    try {
      const newtitle = await updateChatSession({ id, title });
      updateChat((oldchat) => {
        const newchat = [...oldchat];
        newchat[idx].title = newtitle.title;
        return newchat;
      });
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
          newchat.splice(index, 1);
          return newchat;
        });
      }
    } catch (error) {
      console.error("Error while deleting chat session", error);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-sm p-2 flex flex-col gap-2">
      <ChatSesssionsToolBar />
      <div className="space-y-2">
        {chat.map((item, index) => {
          const isOpen = openDialogId === item.id;

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-md border ${
                index === currentChat ? "bg-muted" : ""
              }`}
            >
              <p
                className="text-sm font-medium cursor-pointer"
                onClick={() => setCurrentChat(index)}
              >
                {item.title}
              </p>

              <div className="flex items-center gap-2">
                <Dialog
                  open={isOpen}
                  onOpenChange={(open) => {
                    setOpenDialogId(open ? item.id : null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = (
                          e.currentTarget.elements.namedItem(
                            "newTitle",
                          ) as HTMLInputElement
                        ).value;
                        startTransition(async () => {
                          await handleEditTitle(index, input, item.id);
                          setOpenDialogId(null);
                        }); // fin du chargement
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle>Modifier le titre</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 py-4">
                        <Label htmlFor="newTitle">Nouveau titre</Label>
                        <Input
                          id="newTitle"
                          name="newTitle"
                          defaultValue={item.title || ""}
                          placeholder="Nouveau titre"
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                          {isPending ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            "Valider"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteChatSession(item.id, index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
