import illustrationSvg from "../assets/images/illustration.svg";
import logoSvg from "../assets/images/logo.svg";
import googleIconSvg from "../assets/images/google-icon.svg";
import { useHistory } from "react-router-dom";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export default function Home() {
	const history = useHistory();
	const { user, singInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState("");

	async function handleCreateRoom() {
		if (!user) {
			await singInWithGoogle();
		}
		history.push("/rooms/new");
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === "") return;

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert("Room does not exists.");
			return;
		}

		history.push(`rooms/${roomCode}`);
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
					<button
						onClick={handleCreateRoom}
						className="create-roon"
						type="button"
					>
						<img src={googleIconSvg} alt="logo do Google" />
						Crie sua sala com o google
					</button>
					<div className="separator">ou entre numa sala</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
						/>
						<Button type="submit">Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
