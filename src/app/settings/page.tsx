// src/app/settings/page.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, HardDrive, LogOut, Palette, UserCircle } from "lucide-react";

export default function SettingsPage() {
  const SettingItem = ({ icon: Icon, title, description, action }: { icon: React.ElementType, title: string, description: string, action: React.ReactNode }) => (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-zinc-800">
        <div className="flex items-center gap-4">
            <Icon className="h-6 w-6 text-zinc-400" />
            <div>
                <Label className="text-base">{title}</Label>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>
        </div>
        <div>
            {action}
        </div>
    </div>
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-zinc-900">
      <header className="pb-6 border-b border-zinc-700 mb-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
      </header>
      <div className="space-y-6">
        <SettingItem 
            icon={Bell} 
            title="Notificações no Desktop" 
            description="Exibir alertas de novas mensagens." 
            action={<Switch id="desktop-notifications" defaultChecked />} 
        />
        <SettingItem 
            icon={Palette} 
            title="Tema da Aplicação" 
            description="Mudar para o modo claro ou escuro." 
            action={<Button variant="outline" className="bg-zinc-700 border-zinc-600">Mudar Tema</Button>} 
        />
        <SettingItem 
            icon={HardDrive} 
            title="Exportar Conversas" 
            description="Salvar um backup de todas as suas conversas." 
            action={<Button variant="outline" className="bg-zinc-700 border-zinc-600">Exportar</Button>} 
        />
        <SettingItem 
            icon={LogOut} 
            title="Sair da Conta" 
            description="Desconectar seu perfil desta sessão." 
            action={<Button variant="destructive">Sair</Button>} 
        />
      </div>
    </div>
  );
}