import React from "react"
import { useState } from "react"

export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyMjE2ZGE2OC0zMzExLTQ4ZDAtYTUzZC1jNTE2NjdlY2YxMmMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4Mzc0OTU3OCwiZXhwIjoxNzE1Mjg1NTc4fQ.eXnvegcjHn3mS7KBA1Cc-U3pnE6cBtx64wsWmDbqf7s"

export const createMeeting = async ({ token }) => {
    const response = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });

    const { roomId } = await response.json();
    return roomId;
};
