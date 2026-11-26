import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import alarm from "../assets/alarm.mp3";

export default function Timer() {
	const alarmSound = new Audio(alarm);
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isWorkTime, setIsWorkTime] = useState(true);
	const [totalTime, setTotalTime] = useState(1500);
	const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		setElapsedTime(0);
		setTotalTime(isWorkTime ? 1500 : 300);
	}, [isWorkTime]);

	useEffect(() => {
		if (!isRunning) {
			document.title = "Focus Flow";
			return;
		}

		intervalIdRef.current = setInterval(() => {
			setElapsedTime((e) => {
				const nextElapsed = e + 1;

				if (totalTime - nextElapsed <= 0) {
					setIsWorkTime(!isWorkTime);
					alarmSound.currentTime = 0;
					alarmSound.play();
					return 0;
				}

				return nextElapsed;
			});
		}, 1000);

		return () => {
			if (intervalIdRef.current !== null) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, [isRunning, totalTime]);

	function formatTimeLeft() {
		const minutes = String(Math.floor((totalTime - elapsedTime) / 60));
		const seconds = String((totalTime - elapsedTime) % 60);
		const formatedTimeLeft = `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;

		document.title = `${formatedTimeLeft} - ${isWorkTime ? "Keep up the hard work!" : "Enjoy your break!"}`;
		return formatedTimeLeft;
	}

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center rounded-2xl bg-rose-300 px-15 py-12 shadow-2xl">
				<div className="inline-flex items-center justify-center gap-2 pb-3">
					<p className="h-fit pb-1.5 text-2xl text-white">
						{isWorkTime ? "Work Time" : "Break Time"}
					</p>
					<button
						type="button"
						onClick={() => {
							setIsWorkTime(!isWorkTime);
							setIsRunning(false);
						}}
					>
						<FontAwesomeIcon
							icon={faForwardStep}
							className="cursor-pointer text-xl text-white hover:text-gray-300"
						/>
					</button>
				</div>

				<p className="font-sans text-9xl font-bold text-white text-shadow-2xs">
					{formatTimeLeft()}
				</p>
				<button
					type="button"
					onClick={() => setIsRunning(!isRunning)}
					className="mt-3 h-fit w-fit cursor-pointer rounded-xl bg-white px-10 py-3 text-2xl text-rose-600 drop-shadow-lg transition-all hover:scale-105 active:scale-107"
				>
					{isRunning ? "Pause" : "Start"}
				</button>
			</div>
		</div>
	);
}
