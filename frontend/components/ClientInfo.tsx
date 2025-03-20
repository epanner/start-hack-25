"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Client } from "@/types/client"

interface ClientInfoProps {
  client: Client
}

export function ClientInfo({ client }: ClientInfoProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={client.avatar} alt={client.name} />
          <AvatarFallback>{client.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-white">{client.name}</h2>
          <p className="text-sm text-slate-400">{client.email}</p>
        </div>
      </div>

      <Separator className="my-3 bg-slate-800" />

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-slate-400">Date of Birth:</div>
          <div className="text-white">
            {new Date(client.dateOfBirth).toLocaleDateString()} ({client.age})
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-slate-400">Marital Status:</div>
          <div className="text-white">{client.maritalStatus}</div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-slate-400">Risk Profile:</div>
          <div className="text-white">{client.riskProfile}</div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-slate-400">Last Contact:</div>
          <div className="text-white">{new Date(client.lastContact).toLocaleDateString()}</div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-slate-400">AUM:</div>
          <div className="text-white">{client.aum}</div>
        </div>

        <Separator className="my-1 bg-slate-800" />

        <div className="text-sm">
          <div className="text-slate-400 mb-1">Additional Information:</div>
          <div className="text-xs text-white">{client.additionalInfo}</div>
        </div>
      </div>
    </div>
  )
}

