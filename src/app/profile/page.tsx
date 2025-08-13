// src/app/profile/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="flex-1 overflow-y-auto bg-zinc-900 flex flex-col items-center p-8">
            <header className="w-full text-center pb-6 border-b border-zinc-700 mb-8">
                <h1 className="text-2xl font-bold">Seu Perfil</h1>
            </header>

            <div className="relative mb-8">
                <Avatar className="h-40 w-40 border-4 border-zinc-800">
                    <AvatarImage src="https://github.com/uGuilhermeOliveiraa2005.png" alt="Seu Avatar" />
                    <AvatarFallback>GO</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-2 right-2 p-2 bg-green-600 rounded-full hover:bg-green-700">
                    <Camera className="h-6 w-6 text-white"/>
                </button>
            </div>

            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="profile-name">Seu Nome</Label>
                    <Input id="profile-name" defaultValue="Guilherme Oliveira" className="bg-zinc-800 border-zinc-700 text-lg p-6"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="profile-status">Recado</Label>
                    <Input id="profile-status" defaultValue="Disponível" className="bg-zinc-800 border-zinc-700 text-lg p-6"/>
                </div>
                <div className="flex justify-end pt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-base py-6 px-8">Salvar Perfil</Button>
                </div>
            </div>
        </div>
    );
}