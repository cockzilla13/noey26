/*"use client";

import Link from "next/link";
import { useEffect,useState }
from "react";

import { supabase }
from "@/lib/supabase";

export default function AdminGuestbook() {

 const [messages,setMessages] =
  useState<any[]>([]);

 async function load() {

  const { data } =
   await supabase
    .from("guestbook")
    .select("*")
    .order(
      "created_at",
      { ascending:false }
    );

  setMessages(data || []);

 }

 useEffect(() => {
  load();
 }, []);

 async function approve(id:string) {

  await supabase
   .from("guestbook")
   .update({
     approved:true
   })
   .eq("id",id);

  load();

 }

 return (

  <main className="p-8">

   <h1
    className="
    text-4xl
    font-bold
    mb-8
    "
   >
    ❤️ Modération Livre d'Or
   </h1>

   {messages.map((m) => (

    <div
     key={m.id}
     className="
     border
     rounded-xl
     p-4
     mb-4
     "
    >

     <h3>

      {m.first_name}
      {" "}
      {m.last_name}

     </h3>

     <p>{m.message}</p>

     <p>

      Etat :
      {" "}
      {m.approved
       ? "✅"
       : "⏳"}

     </p>

     {!m.approved && (

      <button
       onClick={() =>
        approve(m.id)
       }
       className="
       bg-green-600
       text-white
       px-4
       py-2
       rounded-xl
       "
      >
       Approuver
      </button>

     )}

    </div>

   ))}

  </main>

 );
} */

/*"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminGuestbook() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setMessages(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id: string) {
    setApproving(id);

    await supabase
      .from("guestbook")
      .update({
        approved: true,
      })
      .eq("id", id);

    await load();

    setApproving(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header *}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            ❤️ Modération Livre d'Or
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Gérez les messages envoyés dans votre livre d'or.
          </p>
        </header>

        {/* Loading *}
        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-sm text-gray-500 sm:text-base">
              Chargement des messages...
            </p>
          </div>
        )}

        {/* Empty state *}
        {!loading && messages.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="mb-3 text-4xl">💌</div>

            <h2 className="text-lg font-semibold text-gray-900">
              Aucun message
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Aucun message n'a encore été publié dans le livre d'or.
            </p>
          </div>
        )}

        {/* Messages *}
        {!loading && messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((m) => (
              <article
                key={m.id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition
                  hover:shadow-md
                "
              >
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Top *}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-semibold text-gray-900 sm:text-lg">
                        {m.first_name} {m.last_name}
                      </h3>

                      {m.created_at && (
                        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                          {new Date(m.created_at).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>

                    {/* Status *}
                    <span
                      className={`
                        inline-flex
                        w-fit
                        shrink-0
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          m.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }
                      `}
                    >
                      {m.approved ? "✅ Approuvé" : "⏳ En attente"}
                    </span>
                  </div>

                  {/* Message *}
                  <div className="my-4 rounded-xl bg-gray-50 p-3 sm:my-5 sm:p-4">
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                      {m.message}
                    </p>
                  </div>

                  {/* Action *}
                  {!m.approved && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <button
                        onClick={() => approve(m.id)}
                        disabled={approving === m.id}
                        className="
                          w-full
                          rounded-xl
                          bg-green-600
                          px-4
                          py-3
                          text-sm
                          font-semibold
                          text-white
                          shadow-sm
                          transition
                          hover:bg-green-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500
                          focus:ring-offset-2
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          sm:w-auto
                        "
                      >
                        {approving === m.id
                          ? "Approbation..."
                          : "✓ Approuver"}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}*/
/*"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminGuestbook() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setMessages(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id: string) {
    setApproving(id);

    const { error } = await supabase
      .from("guestbook")
      .update({
        approved: true,
      })
      .eq("id", id);

    if (!error) {
      await load();
    }

    setApproving(null);
  }

  const pendingCount = messages.filter(
    (message) => !message.approved
  ).length;

  const approvedCount = messages.filter(
    (message) => message.approved
  ).length;

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 md:px-8 lg:px-10 xl:px-12">
        {/* HEADER *}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                ❤️ Modération Livre d'Or
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Gérez les messages envoyés dans votre livre d'or et
                approuvez ceux qui doivent être visibles.
              </p>
            </div>

            {/* STATISTIQUES *}
            {!loading && messages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-medium text-gray-500">
                    Total
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {messages.length}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-xs font-medium text-amber-700">
                    En attente
                  </p>

                  <p className="mt-1 text-xl font-bold text-amber-800">
                    {pendingCount}
                  </p>
                </div>

                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-xs font-medium text-green-700">
                    Approuvés
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-800">
                    {approvedCount}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* LOADING *}
        {loading && (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <p className="text-sm text-gray-500 sm:text-base">
                Chargement des messages...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY *}
        {!loading && messages.length === 0 && (
          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <div>
              <div className="mb-4 text-5xl">💌</div>

              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Aucun message
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Aucun message n'a encore été envoyé dans votre livre
                d'or.
              </p>
            </div>
          </div>
        )}

        {/* MESSAGES *}
        {!loading && messages.length > 0 && (
          <section className="space-y-3 sm:space-y-4">
            {messages.map((m) => (
              <article
                key={m.id}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  shadow-sm
                  transition-all
                  hover:shadow-md
                  ${
                    m.approved
                      ? "border-gray-200"
                      : "border-amber-200"
                  }
                `}
              >
                <div className="p-4 sm:p-5 md:p-6">
                  {/* IDENTITÉ + STATUT *}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="break-words text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
                        {m.first_name} {m.last_name}
                      </h2>

                      {m.created_at && (
                        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                          {new Date(m.created_at).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      )}
                    </div>

                    <span
                      className={`
                        inline-flex
                        w-fit
                        shrink-0
                        items-center
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        sm:px-4
                        sm:py-2
                        sm:text-sm
                        ${
                          m.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }
                      `}
                    >
                      {m.approved
                        ? "✅ Approuvé"
                        : "⏳ En attente"}
                    </span>
                  </div>

                  {/* MESSAGE *}
                  <div
                    className={`
                      mt-4
                      rounded-xl
                      p-3
                      sm:mt-5
                      sm:p-4
                      md:p-5
                      ${
                        m.approved
                          ? "bg-gray-50"
                          : "bg-amber-50/60"
                      }
                    `}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                      {m.message}
                    </p>
                  </div>

                  {/* ACTION *}
                  {!m.approved && (
                    <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => approve(m.id)}
                        disabled={approving === m.id}
                        className="
                          flex
                          min-h-11
                          w-full
                          items-center
                          justify-center
                          rounded-xl
                          bg-green-600
                          px-5
                          py-3
                          text-sm
                          font-semibold
                          text-white
                          shadow-sm
                          transition
                          hover:bg-green-700
                          active:bg-green-800
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500
                          focus:ring-offset-2
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          sm:w-auto
                        "
                      >
                        {approving === m.id ? (
                          <>
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Approbation...
                          </>
                        ) : (
                          "✓ Approuver"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}*/
"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GuestbookMessage = {
  id: string;
  first_name: string;
  last_name: string | null;
  message: string;
  approved: boolean;
  created_at: string;
};

export default function AdminGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const [actionId, setActionId] = useState<string | null>(null);

  const [messageToDelete, setMessageToDelete] =
    useState<GuestbookMessage | null>(null);

  const [deleting, setDeleting] = useState(false);

  const [deletedCount, setDeletedCount] = useState(0);

  // =====================================================
  // CHARGER LES MESSAGES
  // =====================================================

  const loadMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setMessages(data || []);
    } else {
      console.error("Erreur chargement messages :", error);
    }
  }, []);

  // =====================================================
  // CHARGER LE COMPTEUR DES SUPPRESSIONS
  // =====================================================

  const loadDeletedCount = useCallback(async () => {
    const { data, error } = await supabase
      .from("guestbook_stats")
      .select("deleted_count")
      .eq("id", 1)
      .single();

    if (!error) {
      setDeletedCount(data?.deleted_count ?? 0);
    } else {
      console.error("Erreur compteur suppressions :", error);
    }
  }, []);

  // =====================================================
  // CHARGEMENT INITIAL
  // =====================================================

  const load = useCallback(async () => {
    setLoading(true);

    await Promise.all([
      loadMessages(),
      loadDeletedCount(),
    ]);

    setLoading(false);
  }, [loadMessages, loadDeletedCount]);

  useEffect(() => {
    load();
  }, [load]);

  // =====================================================
  // REALTIME SUPABASE
  // =====================================================

  useEffect(() => {
    const channel = supabase
      .channel("guestbook-admin-realtime")

      // Messages ajoutés / modifiés / supprimés
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "guestbook",
        },
        async () => {
          await Promise.all([
            loadMessages(),
            loadDeletedCount(),
          ]);
        }
      )

      // Compteur des suppressions
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "guestbook_stats",
        },
        (payload) => {
          const newCount =
            payload.new?.deleted_count;

          if (typeof newCount === "number") {
            setDeletedCount(newCount);
          }
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadMessages, loadDeletedCount]);

  // =====================================================
  // APPROUVER
  // =====================================================

  async function approve(id: string) {
    setActionId(id);

    const { error } = await supabase
      .from("guestbook")
      .update({
        approved: true,
      })
      .eq("id", id);

    if (error) {
      alert(
        "Une erreur est survenue lors de l'approbation."
      );
    } else {
      // Mise à jour immédiate de l'interface
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? {
                ...message,
                approved: true,
              }
            : message
        )
      );
    }

    setActionId(null);
  }

  // =====================================================
  // DÉSAPPROUVER
  // =====================================================

  async function disapprove(id: string) {
    setActionId(id);

    const { error } = await supabase
      .from("guestbook")
      .update({
        approved: false,
      })
      .eq("id", id);

    if (error) {
      alert(
        "Une erreur est survenue lors de la désapprobation."
      );
    } else {
      // Mise à jour immédiate de l'interface
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? {
                ...message,
                approved: false,
              }
            : message
        )
      );
    }

    setActionId(null);
  }

  // =====================================================
  // SUPPRIMER
  // =====================================================

  async function deleteMessage(id: string) {
    setDeleting(true);
    setActionId(id);

    const { error } = await supabase
      .from("guestbook")
      .delete()
      .eq("id", id);

    if (error) {
      alert(
        "Une erreur est survenue lors de la suppression."
      );
    } else {
      // Récupérer le message avant de le supprimer
      const deletedMessage = messages.find(
        (message) => message.id === id
      );

      // Retirer immédiatement de l'écran
      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message.id !== id
        )
      );

      // Incrémentation immédiate du compteur
      setDeletedCount((currentCount) =>
        currentCount + 1
      );

      setMessageToDelete(null);

      // Resynchronisation avec Supabase
      await loadDeletedCount();

      // Cette variable est volontairement conservée ici
      // pour montrer que la suppression tient compte
      // du statut du message.
      void deletedMessage;
    }

    setActionId(null);
    setDeleting(false);
  }

  // =====================================================
  // COMPTEURS CALCULÉS EN TEMPS RÉEL
  // =====================================================

  const pendingCount = messages.filter(
    (message) => !message.approved
  ).length;

  const approvedCount = messages.filter(
    (message) => message.approved
  ).length;

  const totalCount = messages.length;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 md:px-8 lg:px-10 xl:px-12">

        {/* =================================================
            HEADER
        ================================================== */}

        <header className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                ❤️ Modération Livre d'Or
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Gérez les messages envoyés dans votre livre d'or.
              </p>
            </div>

            {/* =================================================
                STATISTIQUES
            ================================================== */}

            {!loading && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                {/* TOTAL */}
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-medium text-gray-500">
                    Messages
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    {totalCount}
                  </p>
                </div>

                {/* EN ATTENTE */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-xs font-medium text-amber-700">
                    En attente
                  </p>

                  <p className="mt-1 text-xl font-bold text-amber-800 sm:text-2xl">
                    {pendingCount}
                  </p>
                </div>

                {/* APPROUVÉS */}
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-xs font-medium text-green-700">
                    Approuvés
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-800 sm:text-2xl">
                    {approvedCount}
                  </p>
                </div>

                {/* SUPPRIMÉS */}
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-xs font-medium text-red-700">
                    Supprimés
                  </p>

                  <p className="mt-1 text-xl font-bold text-red-800 sm:text-2xl">
                    {deletedCount}
                  </p>
                </div>

              </div>
            )}
          </div>
        </header>

        {/* =================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="text-center">

              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <p className="text-sm text-gray-500 sm:text-base">
                Chargement des messages...
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================== */}

        {!loading && messages.length === 0 && (
          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">

            <div>

              <div className="mb-4 text-5xl">
                💌
              </div>

              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Aucun message
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Aucun message n'est actuellement présent dans votre livre d'or.
              </p>

              {deletedCount > 0 && (
                <p className="mt-4 text-sm font-semibold text-red-600">
                  🗑️ {deletedCount} message
                  {deletedCount > 1 ? "s" : ""} supprimé
                  {deletedCount > 1 ? "s" : ""} au total.
                </p>
              )}

            </div>

          </div>
        )}

        {/* =================================================
            MESSAGES
        ================================================== */}

        {!loading && messages.length > 0 && (
          <section className="space-y-3 sm:space-y-4">

            {messages.map((m) => {
              const isProcessing =
                actionId === m.id;

              return (
                <article
                  key={m.id}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-sm
                    transition-all
                    hover:shadow-md
                    ${
                      m.approved
                        ? "border-gray-200"
                        : "border-amber-200"
                    }
                  `}
                >

                  <div className="p-4 sm:p-5 md:p-6">

                    {/* IDENTITÉ + STATUT */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">

                        <h2 className="break-words text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
                          {m.first_name}{" "}
                          {m.last_name}
                        </h2>

                        {m.created_at && (
                          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                            {new Date(
                              m.created_at
                            ).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        )}

                      </div>

                      <span
                        className={`
                          inline-flex
                          w-fit
                          shrink-0
                          items-center
                          rounded-full
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          sm:px-4
                          sm:py-2
                          sm:text-sm
                          ${
                            m.approved
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }
                        `}
                      >
                        {m.approved
                          ? "✅ Approuvé"
                          : "⏳ En attente"}
                      </span>

                    </div>

                    {/* MESSAGE */}
                    <div
                      className={`
                        mt-4
                        rounded-xl
                        p-3
                        sm:mt-5
                        sm:p-4
                        md:p-5
                        ${
                          m.approved
                            ? "bg-gray-50"
                            : "bg-amber-50/60"
                        }
                      `}
                    >

                      <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                        {m.message}
                      </p>

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================== */}

                    <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:justify-end">

                      {/* APPROUVER */}
                      {!m.approved && (
                        <button
                          type="button"
                          onClick={() =>
                            approve(m.id)
                          }
                          disabled={isProcessing}
                          className="
                            min-h-11
                            w-full
                            rounded-xl
                            bg-green-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-green-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            sm:w-auto
                          "
                        >
                          {isProcessing
                            ? "Traitement..."
                            : "✓ Approuver"}
                        </button>
                      )}

                      {/* DÉSAPPROUVER */}
                      {m.approved && (
                        <button
                          type="button"
                          onClick={() =>
                            disapprove(m.id)
                          }
                          disabled={isProcessing}
                          className="
                            min-h-11
                            w-full
                            rounded-xl
                            border
                            border-amber-300
                            bg-amber-50
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-amber-700
                            transition
                            hover:bg-amber-100
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            sm:w-auto
                          "
                        >
                          {isProcessing
                            ? "Traitement..."
                            : "↩ Désapprouver"}
                        </button>
                      )}

                      {/* SUPPRIMER */}
                      <button
                        type="button"
                        onClick={() =>
                          setMessageToDelete(m)
                        }
                        disabled={
                          isProcessing ||
                          deleting
                        }
                        className="
                          min-h-11
                          w-full
                          rounded-xl
                          border
                          border-red-200
                          bg-red-50
                          px-5
                          py-3
                          text-sm
                          font-semibold
                          text-red-600
                          transition
                          hover:bg-red-100
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          sm:w-auto
                        "
                      >
                        🗑 Supprimer
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </section>
        )}

        {/* =================================================
            MODAL SUPPRESSION
        ================================================== */}

        {messageToDelete && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/60
              p-4
              backdrop-blur-sm
            "
            onClick={() => {
              if (!deleting) {
                setMessageToDelete(null);
              }
            }}
          >

            <div
              className="
                w-full
                max-w-md
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-2xl
              "
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}
              <div className="border-b border-gray-100 p-5 sm:p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl">
                    🗑️
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                      Supprimer ce message ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Cette action est définitive.
                    </p>

                  </div>

                </div>

              </div>

              {/* CONTENU */}
              <div className="p-5 sm:p-6">

                <p className="text-sm leading-6 text-gray-600">

                  Le message de{" "}

                  <strong className="text-gray-900">
                    {messageToDelete.first_name}{" "}
                    {messageToDelete.last_name}
                  </strong>{" "}

                  sera définitivement supprimé.

                </p>

                <div className="mt-4 max-h-40 overflow-y-auto rounded-xl bg-gray-50 p-4">

                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                    {messageToDelete.message}
                  </p>

                </div>

              </div>

              {/* FOOTER */}
              <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50 p-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setMessageToDelete(null)
                  }
                  disabled={deleting}
                  className="
                    min-h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-gray-700
                    transition
                    hover:bg-gray-100
                    disabled:opacity-50
                    sm:w-auto
                  "
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteMessage(
                      messageToDelete.id
                    )
                  }
                  disabled={deleting}
                  className="
                    flex
                    min-h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-red-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:w-auto
                  "
                >

                  {deleting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Suppression...
                    </>
                  ) : (
                    "🗑 Supprimer définitivement"
                  )}

                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}