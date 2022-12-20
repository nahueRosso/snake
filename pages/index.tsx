import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useRef, useState } from "react"
import AppleLogo from "applePixels.png"
import Monitor from "oldMonitor.png"
import useInterval from "../components/useInterval"



const canvasX = 1000
const canvasY = 1000
const initialSnake = [[4, 10], [4, 10]]
const initialApple = [14, 10]
const scale = 50


function App() {
	const refFruit = useRef<any>()
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [snake, setSnake] = useState(initialSnake)
	const [apple, setApple] = useState(initialApple)
	const [direction, setDirection] = useState([0, -1])
	const [delay, setDelay] = useState<number | null>(null)
	const [gameOver, setGameOver] = useState(false)
	const [score, setScore] = useState(0)
	const [colorChange, setColorChange] = useState<string>("#00d001")
	const [timeDelay, setTimeDelay] = useState<number>(100)

	useInterval(() => runGame(), delay)

	const randomHex = () => {
		let n = (Math.random() * 0xfffff * 1000000).toString(16);
		return '#' + n.slice(0, 6);
	};



	useEffect(
		() => {
			let fruit = refFruit.current as HTMLCanvasElement
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					ctx.fillStyle = colorChange
					snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1))
					ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
				}
			}

		},
		[snake, apple, gameOver]
	)

	function handleSetScore() {
		if (score > Number(localStorage.getItem("snakeScore"))) {
			localStorage.setItem("snakeScore", JSON.stringify(score))
		}
	}

	function play() {
		setSnake(initialSnake)
		setApple(initialApple)
		setDirection([1, 0])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
	}

	function checkCollision(head: number[]) {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function appleAte(newSnake: number[][]) {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale))
		if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
			let newApple = coord
			setScore(score + 1)
			setApple(newApple)
			setColorChange(randomHex)
			return true
		}

		return false
	}

	function runGame() {
		const newSnake = [...snake]
		const newSnakeHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]]
		newSnake.unshift(newSnakeHead)
		// console.log(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			setDelay(null)
			setGameOver(true)
			handleSetScore()
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
		if (gameOver === false) {
			switch (e.key) {
				case "ArrowLeft":
					setDirection([-1, 0])
					break
				case "ArrowUp":
					setDirection([0, -1])
					break
				case "ArrowRight":
					setDirection([1, 0])
					break
				case "ArrowDown":
					setDirection([0, 1])
					break
			}
		
		}
		
	}

	// console.log("hola")
	useEffect(() => {
		console.log("hola")
		setTimeDelay(1)
		setDelay(timeDelay)
		console.log("ligeero")
		setTimeout(() => {
			setTimeDelay(100)
			setDelay(timeDelay)
			console.log("ahora")
		}, 1.5);
		
	}, [direction])

	// useEffect(()=>{
	// 	if (gameOver===true) {
	// 		setSnake(initialSnake)
	// 	    setApple(initialApple)
	// 	    setDirection([1, 0])
	// 	    setDelay(timeDelay)
	// 	    setScore(0)
	// 	    setGameOver(false)
	// 	}
	// },[direction])

	return (
		<div onKeyDown={(e) => changeDirection(e)}>
			<img id={styles.fruit} ref={refFruit} src="./point.gif" alt="fruit" width="30" />

			{gameOver === false?
			<img src="./Secuencia01.gif" alt="fruit" width="4000" className={styles.monitor} />:
			<img src="./Secuencia01.gif" alt="fruit" width="4000" className={styles.monitor} />}
			<div className={styles.bkgDiv}></div>
			
			<canvas className={styles.playArea} ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
			{gameOver && <div className={styles.gameOver}>Game Over</div>}
			<button onClick={play} className={styles.playButton}>
				{gameOver === true ? "try again" : "play"}
			</button>
			<div className={styles.scoreBox}>
				<h2 className={styles.h2}>Score: {score}</h2>
				{/* <h2 className={styles.h2}>High Score: {localStorage.getItem("snakeScore")}</h2> */}
			</div>
		</div>
	)
}

export default App

