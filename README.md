# Factor

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/TheCrocodileNest/factor/Build%20and%20Deploy)

> Omnichannel marketplace revenue dashboard

## Introduction

This project was made in the hackathon [Mega Hack 3](https://www.megahack.com.br/) to solve the challenge proposed by [Vtex](https://vtex.com/).

## Getting started

To run this system you will need node and npm. After cloning this repository, install the dependencies and start the server:

```sh
npm install
npm run dev
```

## Data

We used a mockup of the Vtex's api to have more flexibility with the data, and to avoid atrict due to shop account creation an setup. Inside `data` there are jsons for each object used and a script `createData.js` that generates orders.

```sh
# example command to generate orders data
npm run data 07/01/2020 07/31/2020
```
