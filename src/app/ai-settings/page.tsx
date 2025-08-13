// src/app/ai-settings/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // <-- Importar o Input
import { Wrench, Cpu, BrainCircuit, Bot, Timer } from "lucide-react"; // <-- Importar o Timer

export default function AiSettingsPage() {
  // Estado para controlar o valor do slider em tempo real
  const [temperature, setTemperature] = useState(0.7);

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-zinc-900">
      <header className="flex items-center gap-4 pb-6 border-b border-zinc-700 mb-8">
        <Wrench className="h-8 w-8 text-zinc-400" />
        <h1 className="text-2xl font-bold">Configurações da Inteligência Artificial</h1>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Seção de Personalidade */}
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <BrainCircuit className="h-6 w-6 text-green-400"/>
                <h2 className="text-xl font-semibold">Personalidade da IA</h2>
            </div>
            <div className="p-6 bg-zinc-800/50 border border-zinc-800 rounded-lg">
                <Label htmlFor="system-prompt" className="text-base">Prompt do Sistema</Label>
                <Textarea
                id="system-prompt"
                placeholder="Ex: Você é um assistente amigável da Eletrônica Silva..."
                className="min-h-[140px] mt-2 bg-zinc-700 border-zinc-600 text-white focus:ring-green-500"
                defaultValue="Você é um assistente da Eletrônica do Guilherme. Seja sempre cordial, prestativo e responda em português do Brasil. Suas respostas devem ser úteis e diretas."
                />
            </div>
        </section>

        {/* Seção de Parâmetros */}
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <Cpu className="h-6 w-6 text-green-400"/>
                <h2 className="text-xl font-semibold">Parâmetros de Execução</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-800/50 border border-zinc-800 rounded-lg">
                {/* Modelo em Uso */}
                <div className="flex flex-col gap-2">
                    <Label className="text-base">Modelo em Uso</Label>
                    <div className="flex items-center gap-2 text-lg font-mono p-3 bg-zinc-700 border border-zinc-600 rounded-md">
                        <Cpu size={20} />
                        <span>Llama 3 8b (Groq)</span>
                    </div>
                    <p className="text-xs text-zinc-500">Este é o modelo de IA fixo para esta aplicação.</p>
                </div>
                {/* Slider de Criatividade */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="temperature" className="text-base">Nível de Criatividade</Label>
                        <span className="w-16 text-center font-mono text-lg p-2 bg-zinc-700 border border-zinc-600 rounded-md">
                            {temperature.toFixed(1)}
                        </span>
                    </div>
                    <Slider 
                        id="temperature" 
                        value={[temperature]} 
                        onValueChange={(value) => setTemperature(value[0])}
                        max={2} 
                        step={0.1}
                        className="my-3 [&>span:first-child]:bg-green-500"
                    />
                    <div className="flex justify-between text-xs text-zinc-500">
                        <span>Mais Preciso</span>
                        <span>Mais Criativo</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Seção de Automação */}
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-green-400"/>
                <h2 className="text-xl font-semibold">Automação</h2>
            </div>
             <div className="p-6 bg-zinc-800/50 border border-zinc-800 rounded-lg space-y-6">
                {/* Respostas automáticas */}
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="auto-reply" className="text-base font-medium">Ativar respostas automáticas</Label>
                        <p className="text-sm text-zinc-400">Permite que a IA responda automaticamente a todas as novas mensagens.</p>
                    </div>
                    <Switch id="auto-reply" className="data-[state=checked]:bg-green-600"/>
                </div>
                
                {/* Divisor */}
                <div className="border-t border-zinc-700/50"></div>

                {/* Delay Aleatório */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="random-delay" className="text-base font-medium">Ativar delay aleatório nas respostas</Label>
                            <p className="text-sm text-zinc-400">Simula um tempo de digitação para humanizar a resposta.</p>
                        </div>
                        <Switch id="random-delay" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                            <Label htmlFor="min-delay" className="text-sm">Tempo Mínimo (minutos)</Label>
                            <Input id="min-delay" type="number" defaultValue={1} className="bg-zinc-700 border-zinc-600" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="max-delay" className="text-sm">Tempo Máximo (minutos)</Label>
                            <Input id="max-delay" type="number" defaultValue={10} className="bg-zinc-700 border-zinc-600" />
                        </div>
                    </div>
                </div>
             </div>
        </section>

        <div className="flex justify-end pt-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-base">
                Salvar Configurações
            </Button>
        </div>

      </div>
    </div>
  );
}