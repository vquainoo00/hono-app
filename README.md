# Hotel Management API

This project demonstrates how to build a scalable, serverless API using Hono, Cloudflare Workers, and Cloudflare D1. 
## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)

## Introduction

This project showcases the power of building cloud-native applications using modern tools like Hono, Cloudflare Workers, and D1. The main inspiration behind this project was to explore Cloudflare's offerings and build an API that runs entirely on the edge.

## Technologies Used

- **Hono**: A lightweight, fast, and cloud-agnostic web framework optimized for edge environments.
- **Cloudflare Workers**: Serverless functions running at the edge, providing low-latency responses.
- **Cloudflare D1**: A serverless managed database by Cloudflare, perfect for storing application data close to the users.

## Features

- **Fast and Scalable**: Leveraging Cloudflare's global network, the API delivers low-latency responses.
- **Serverless**: No need to manage servers; the infrastructure scales automatically.
- **Cloud-Agnostic Flexibility**: Hono allows for easy migration to other cloud platforms if needed.
- **Modular Codebase**: The API's architecture separates routes, services, and database interactions for easy maintenance and scalability.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>=16.x)
- Cloudflare CLI (`wrangler`)
- An active Cloudflare account

