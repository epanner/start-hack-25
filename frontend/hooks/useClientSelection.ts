"use client"

import { useState } from "react"
import { clients } from "@/data/clients"

export function useClientSelection() {
  const [selectedClientId, setSelectedClientId] = useState("1")
  const [clientSearchQuery, setClientSearchQuery] = useState("")

  const clientData = clients.find((client) => client.id === selectedClientId) || clients[0]

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId)
  }

  // Sort clients alphabetically by last name
  const sortedClients = clients.slice().sort((a, b) => {
    const aLastName = a.name.split(" ").pop() || ""
    const bLastName = b.name.split(" ").pop() || ""
    return aLastName.localeCompare(bLastName)
  })

  const filteredClients = sortedClients.filter(
    (client) => clientSearchQuery === "" || client.name.toLowerCase().includes(clientSearchQuery.toLowerCase()),
  )

  return {
    selectedClientId,
    clientData,
    clientSearchQuery,
    filteredClients,
    handleClientChange,
    setClientSearchQuery,
  }
}

