import Link from "next/link";
import { playfair } from "./components/ui/fonts";

export default function Home() {
  return (
    <>
      <div className="bg-[url('/images/bg_home.jpg')] bg-center -z-10 fixed top-0 left-0">
        <header
          className="flex flex-col items-center justify-center backdrop-blur-[1px] bg-black/20 text-white w-screen space-y-10 h-screen
        "
        >
          <h1 className={`${playfair.className} text-7xl font-bold`}>
            EpicTales
          </h1>
          <p className="text-xl text-center">
            Crie e compartilhe suas histórias épicas de RPG com seus jogadores
            com o apoio de inteligência artificial.
          </p>

          <div className="space-x-10">
            <Link
              href="/login"
              className="bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-xl transition hover:bg-red-800"
            >
              Começar Jornada
            </Link>
            <Link
              href="/create-account"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold
              text-xl transition hover:bg-white hover:text-red-700"
            >
              Crie uma Conta
            </Link>
          </div>
        </header>
      </div>

      <main
        className="mt-[100vh] space-y-10 z-10 bg-slate-900 py-10 px-20 h-screen flex flex-col items-center justify-center
        shadow-[0_-35px_20px_10px_rgba(0,0,0,0.3)] text-white"
      >
        <h1 className={`text-3xl text-center font-bold mb-20 ${playfair.className}`}>
          Como o EpicTales pode te ajudar a criar e gerenciar histórias épicas
          de RPG?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="flex flex-col justify-center items-center text-center border border-red-400 rounded-lg p-5 transition
            hover:bg-red-700 hover:border-red-700 hover:text-white"
          >
            <h2 className={`text-2xl pb-4`}>Geração de NPCs</h2>
            <p>
              Com o EpicTales, você pode gerar NPCs com personalidades únicas
              para seus jogadores interagirem.
            </p>
          </div>

          <div
            className="flex flex-col justify-center items-center text-center border border-red-400 rounded-lg p-5 transition
            hover:bg-red-800 hover:border-red-800 hover:text-white"
          >
            <h2 className={`text-2xl pb-4`}>Pesquisa de Itens e Monstros</h2>
            <p>
              Encontre itens para seus jogadores e busque por monstros no
              bestiário com facilidade.
            </p>
          </div>

          <div
            className="flex flex-col justify-center items-center text-center border border-red-400 rounded-lg p-5 transition
            hover:bg-red-800 hover:border-red-800 hover:text-white"
          >
            <h2 className={`text-2xl pb-4`}>Gerenciamento da campanha</h2>
            <p>
              O EpicTales permite que você gerencie suas campanhas de RPG de
              forma organizada e eficiente.
            </p>
          </div>

          <div
            className="flex flex-col justify-center items-center text-center border border-red-400 rounded-lg p-5 transition
            hover:bg-red-800 hover:border-red-800 hover:text-white"
          >
            <h2 className={`text-2xl pb-4`}>Fichas de Personagem</h2>
            <p>
              Ao criar uma campanha, você pode adicionar fichas de personagens
              para seus jogadores. Eles também podem criar suas próprias fichas
              se você compartilhar um link de convite da campanha.
            </p>
          </div>

          <div
            className="flex flex-col justify-center items-center text-center border border-red-400 rounded-lg p-5 transition
            hover:bg-red-800 hover:border-red-800 hover:text-white"
          >
            <h2 className={`text-2xl pb-4`}>Notas de Sessão</h2>
            <p>
              O mestre pode guardar notas de sessão para cada sessão da
              campanha, facilitando a organização e a continuidade da história.
            </p>
          </div>

          <div
            className="flex flex-col justify-center items-center text-center border border-red-400 rounded-lg p-5 transition
            hover:bg-red-800 hover:border-red-800 hover:text-white"
          >
            <h2 className={`text-2xl pb-4`}>Conjunto de Dados</h2>
            <p>
              O EpicTales possui um conjunto de dados para rolagem de dados de
              RPG, com suporte a diversos sistemas.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
