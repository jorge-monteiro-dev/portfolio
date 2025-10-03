<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ECF7FF] to-[#ffffff] text-center px-4">
    <!-- Logo ou titre -->
    <h1 class="text-4xl md:text-5xl font-questrial text-[#A43838] mb-4 animate-bounce">
      Cheers Location
    </h1>
    <p class="text-lg md:text-xl text-[#344995] font-poppins mb-6">
      Le projet n'est pas encore hebergé... 
      <br /> Revenez bientôt pour le découvrir !
    </p>

    <!-- Animation simple -->
    <div class="flex space-x-2 mt-4">
      <span class="w-3 h-3 bg-[#344995] rounded-full animate-pulse"></span>
      <span class="w-3 h-3 bg-[#A43838] rounded-full animate-pulse delay-150"></span>
      <span class="w-3 h-3 bg-[#FFD0B8] rounded-full animate-pulse delay-300"></span>
    </div>

    <!-- Lien retour portfolio -->
    <a
      href="https://leportfoliodejorge.com"
      class="mt-10 px-6 py-3 rounded-xl bg-[#344995] text-white font-poppins hover:bg-[#A43838] transition-transform hover:scale-105"
    >
      Retour au Portfolio
    </a>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&family=Questrial&display=swap");

.font-poppins { font-family: "Poppins", sans-serif; }
.font-questrial { font-family: "Questrial", sans-serif; }
</style>
