import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Header() {
	const [explainationVisible, setExplainationVisible] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setExplainationVisible(!explainationVisible)}
				className="sticky top-2.5 left-305 z-20 cursor-pointer text-3xl hover:text-gray-400"
			>
				<FontAwesomeIcon icon={faEllipsisVertical} />
			</button>
			<div
				className={`${explainationVisible ? "" : "hidden"} fixed inset-x-0 top-10 p-3 text-center text-xl text-gray-800`}
			>
				<div className="absolute inset-0 bg-white/20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] backdrop-blur-md"></div>
				<p
					className={`${explainationVisible ? "" : "hidden"}mb-1 relative text-4xl`}
				>
					How to Use FocusFlow
				</p>
				<p
					className={`${explainationVisible ? "" : "hidden"}my-1 relative z-10`}
				>
					<strong>Timer:</strong> Click Start to run your 25-minute work session
					or 5-minute break.
				</p>
				<p
					className={`${explainationVisible ? "" : "hidden"}my-1 relative z-10`}
				>
					<strong>Add Tasks:</strong> Type a task into the input box then press
					enter to populate your task list.
				</p>
				<p
					className={`${explainationVisible ? "" : "hidden"}my-1 relative z-10`}
				>
					<strong>Track Progress:</strong> Click the checkbox next to any task
					to check it off and fill your progress bar.
				</p>
				<p
					className={`${explainationVisible ? "" : "hidden"}my-1 relative z-10`}
				>
					<strong>Get Notified:</strong> When the timer hits zero an alarm will
					go off and the timer will automatically change the session.
				</p>
			</div>

			<h1 className="mt-4 mb-0 text-center text-7xl font-bold text-rose-300 text-shadow-lg">
				Focus Flow
			</h1>
			<p className="mb-4 text-center text-xl font-bold text-gray-700 text-shadow-sm">
				Never slack off again!
			</p>
		</>
	);
}
