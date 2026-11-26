import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useEffect, useState } from "react";

type Task = {
	id: `${string}-${string}-${string}-${string}-${string}`;
	taskInformation: string;
};

export default function ToDoList() {
	const [tasks, setTasks] = useState<Task[]>(loadTasks());
	const [newTaskInformation, setNewTaskInformation] = useState("");

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setNewTaskInformation(event.currentTarget.value);
	}

	function addTask(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!newTaskInformation.trim()) return;

		const newTask: Task = {
			id: crypto.randomUUID(),
			taskInformation: newTaskInformation,
		};

		setTasks((t) => [newTask, ...t]);
		setNewTaskInformation("");
	}

	function deleteTask(id: `${string}-${string}-${string}-${string}-${string}`) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	useEffect(() => {
		localStorage.setItem("TASKS", JSON.stringify(tasks));
	});

	function loadTasks(): Task[] {
		const taskJSON = localStorage.getItem("TASKS");
		if (taskJSON == null) return [];
		return JSON.parse(taskJSON);
	}

	return (
		<div className="mt-20 mb-40 flex flex-col items-center">
			<h1 className="mb-5 border-b-2 text-4xl font-bold text-rose-300">
				Tasks:
			</h1>

			<ol className="">
				{tasks.map((task) => (
					<li
						className="flex w-100 justify-between border-b p-3 text-2xl text-rose-300"
						key={task.id}
					>
						<p className="max-w-[25ch] font-semibold wrap-break-word">
							{task.taskInformation}
						</p>
						<button
							className="cursor-pointer text-gray-950 hover:text-gray-600"
							type="button"
							onClick={() => deleteTask(task.id)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</li>
				))}
			</ol>

			<form className="mt-3 flex p-3" onSubmit={addTask}>
				<input
					className="text-2xl focus:outline-none"
					type="text"
					placeholder="Enter a task..."
					value={newTaskInformation}
					onChange={handleInputChange}
				/>
				<button
					type="submit"
					className="cursor-pointer text-4xl hover:text-gray-600"
				>
					+
				</button>
			</form>
		</div>
	);
}
