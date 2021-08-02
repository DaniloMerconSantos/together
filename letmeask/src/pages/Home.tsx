import React, { useContext } from "react";
import illustrationSvg from "../assets/images/illustration.svg";
import logoSvg from "../assets/images/logo.svg";
import googleIconSvg from "../assets/images/google-icon.svg";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import "../styles/auth.scss";
import { Button } from "../components/Button";

export default function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useContext(AuthContext);

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle()
    }
    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationSvg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoSvg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-roon" type="button">
            <img src={googleIconSvg} alt="logo do Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre numa sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
