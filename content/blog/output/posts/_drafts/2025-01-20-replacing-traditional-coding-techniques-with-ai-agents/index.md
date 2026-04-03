---
title: "Replacing Traditional Coding techniques with AI Agents"
date: 2025-01-20
categories: 
  - "ai"
draft: true
---

## Introduction

I was interested in researching how I could use AI tools and techniques, particularl, AI Agents, within my software projects in place of traditional coding techniques.

I built a simple Tic-Tac-Tic program in order to try this out. When creating a simple game like thus, you might initially think of using traditional design strategies—logic-driven rules, if-else conditions, and some clever heuristics.

However, there’s another path: leveraging Artificial Intelligence (AI). In this post, I’ll show you how I built a Tic-Tac-Toe project using a fully connected feed-forward neural network powered by the Deep Q-Network (DQN) algorithm.

Hopefully its an good example of how developers can use AI to solve problems that would otherwise require extensive rule-based logic.

All code for this project is available at [https://github.com/garry-svg/AI-Agent-TicTacToe](https://github.com/garry-svg/AI-Agent-TicTacToe)

## Traditional Coding techniques for Tic-Tac-Toe

In a traditional implementation of Tic-Tac-Toe, the developer explicitly defines the game’s logic. For instance, you might:

- Use if-else conditions to check for winning combinations.

- Implement heuristics to determine strategic moves, such as prioritizing the center or blocking an opponent’s winning move.

- Create exhaustive case-based logic to evaluate all possible board states.

While this approach works for simple games like Tic-Tac-Toe, it becomes unsuitable for more complex problems with large state spaces. It’s here where using AI can really shine..

## AI Approach: AI Agents

In my project, I replaced traditional logic with an AI agent. The key components of this system were:

### 1\. **Environment**

The environment represents the game’s world—the Tic-Tac-Toe board in this case. Using Python's Gymnasium library, I defined the board as a grid of nine positions, each of which could hold an X, O, or remain empty. The environment provides the rules of the game:

- Valid moves.

- Win, lose, or draw conditions.

- Rewards for each move.

### 2\. AI **Agent**

The agent interacts with the environment. It observes the board state and selects actions (moves) to maximize its cumulative reward. The agent is powered by a neural network trained using the DQN algorithm.

### 3\. **Neural Network**

The neural network is a fully connected feed-forward network:

- **Input Nodes:** 9 nodes representing the state of the Tic-Tac-Toe board.

- **Hidden Layers:** Layers that process patterns and relationships within the data.

- **Output Nodes:** 9 nodes corresponding to the Q-values of possible moves.

Each Q-value represents the expected cumulative reward of making a specific move in the current board state.

### 4\. **DQN Algorithm**

The Deep Q-Network algorithm trains the neural network to predict Q-values. Here’s how it works:

- The agent plays games against itself, exploring different moves.

- It receives rewards based on the outcomes of its actions (e.g., +10 for winning, -10 for losing, 0 for a draw).

- The DQN algorithm updates the neural network’s weights to improve its predictions, reinforcing moves that lead to better outcomes.

## Steps to Build the Tic-Tac-Toe AI Agent

#### 1\. **Define the Environment**

Using Gymnasium, I implemented a custom environment for Tic-Tac-Toe. The environment included methods like `reset()` (to initialize the board), `step()` (to process moves), and `render()` (to display the board).

#### 2\. **Set Up the Neural Network**

Stable Baselines3 provided the neural network architecture. I didn’t need to design the network from scratch—the library’s default implementation for DQN included a fully connected feed-forward network.

#### 3\. **Train the Model**

I trained the model using the DQN algorithm by running simulations:

- The agent played 10,000 games against itself.

- It learned which moves maximized its rewards over time.

<figure>

![training AI model](/images/2025-01-20-replacing-traditional-coding-techniques-with-ai-agents/image-1018x1024.png)

<figcaption>

Training the model

</figcaption>

</figure>

#### 4\. **Integrate a User Interface**

To make the game interactive, I built a simple web interface using Flask. The interface allowed a human player to compete against the AI agent, showcasing the AI’s ability to make strategic moves.

## Why Use AI Agents?

Using AI for Tic-Tac-Toe might seem excessive, but it demonstrates concepts that scale to more complex problems. Unlike traditional logic, AI doesn’t require predefined rules. Instead, it learns optimal strategies through training, making it adaptable to:

- Games with larger state spaces (e.g., Chess or Go).

- Dynamic systems where rules evolve.

- Complex decision-making scenarios.

### Key Takeaways

1. **AI Simplifies Complexity:** For simple games like Tic-Tac-Toe, traditional methods are sufficient, but AI shines when scaling to more complex environments.

3. **Reusable Frameworks:** Libraries like Stable Baselines3 and Gymnasium make it easy to implement and train AI agents.

5. **Hands-On Learning:** Building this project deepened my understanding of reinforcement learning, neural networks, and the interplay between agents and environments.

## Conclusion

The Tic-Tac-Toe project is a foundational example of how to build an AI agent. It highlights the shift from rule-based programming to learning-based systems, opening doors to more sophisticated AI applications.

Whether you’re tackling games, robotics, or real-world optimization problems, the principles demonstrated here are a great starting point for leveraging AI effectively.

Have you built your own AI agent or explored reinforcement learning? Share your thoughts in the comments below!
