"use strict"
const log = (...v) => console.log(...v)

const Alexa = require("ask-sdk-core")
const dgram = require("dgram")
const sock = dgram.createSocket("udp4")

const express = require("express")
const bodyParser = require('body-parser')
const port = 3000

const tello = {
    address: "192.168.10.1",
    port: 8889
}



//////// message ////////////////////////////////////////////////////////////////

const REPROMPT_MESSAGE = "操作したい動作をおっしゃってください。"
const START_MESSAGE = `テローコントローラーを起動しました。${REPROMPT_MESSAGE}`
const HELP_MESSAGE = `操作したい動作を言って頂ければテローを操作します。`
const STOP_MESSAGE = "さようなら！"
const FALLBACK_MESSAGE = "すみません、もう一度話しかけて下さい。"



//////// function ////////////////////////////////////////////////////////////////

const wait = ms => new Promise(res => setTimeout(res, ms))

const sendTello = async buf => {
    const message = new Buffer(buf)
    sock.send(message, 0, message.length, tello.port, tello.address)
    await wait(100)
}

const checkDistance = number => {
    number = Number(number)
    return number >= 0 && (number >= 20 && number <= 200)
}

const checkAngle = number => {
    number = Number(number)
    return number >= 0 && (number >= 1 && number <= 360)
}

const getSlotId = (handlerInput, slotName) => {
    let result = ""
    try {
        result = handlerInput.requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0].value.id
    } catch(e) {}
    log(`getSlotId: ${slotName} : ${result}`)
    return result
}

const getSlotName = (handlerInput, slotName) => {
    let result = ""
    try {
        result = handlerInput.requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0].value.name
    } catch(e) {}
    log(`getSlotName: ${slotName} : ${result}`)
    return result
}

const getNumber = (handlerInput) => {
    let result = -1
    try {
        result = handlerInput.requestEnvelope.request.intent.slots.number.value || -1
    } catch(e) {}
    log(`getNumber : ${result}`)
    return result
}



//////// Handler ////////////////////////////////////////////////////////////////

const HelpHandler = {
    canHandle: handlerInput => 
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent",
    handle: handlerInput => {
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(REPROMPT_MESSAGE)
            .getResponse()
    }
}

const EndHandler = {
    canHandle: handlerInput => 
        handlerInput.requestEnvelope.request.type === "SessionEndedRequest" || (
            handlerInput.requestEnvelope.request.type === "IntentRequest" && (
                handlerInput.requestEnvelope.request.intent.name === "EndIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent"
            )
        ),
    handle: handlerInput => {
        log("end!")
        return handlerInput.responseBuilder
            .speak(STOP_MESSAGE)
            .getResponse()
    }
}

const ErrorHandler = {
    canHandle: handlerInput => true,
    handle: handlerInput => {
        log("error!")
        return handlerInput.responseBuilder
            .speak(FALLBACK_MESSAGE)
            .getResponse()
    }
}

const LaunchHandler = {
    canHandle: handlerInput => 
        handlerInput.requestEnvelope.request.type === "LaunchRequest", 
        
    handle: handlerInput => {
        return handlerInput.responseBuilder
            .speak(START_MESSAGE)
            .reprompt("")
            .getResponse()
    }
}

const ControllHandler = {
    canHandle: handlerInput => 
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "ControllIntent",
        
    handle: async handlerInput => {
        let err = false
        
        // get slot
        const action = getSlotId(handlerInput, "action") || "move"
        const direction = getSlotId(handlerInput, "direction")
        const number = getNumber(handlerInput)
        
        const actionName = getSlotName(handlerInput, "action") || "移動"
        const directionName = getSlotName(handlerInput, "direction")
        const unitName = getSlotName(handlerInput, "unit")
        
        // command
        let command = `${action} `
        let commandName = actionName
        switch (action) {
            case "flip":
                if (direction === "") {err = true; break}
                command += direction.slice(0, 1)
                commandName = directionName + actionName
                break
                
            case "up":
            case "down":
                if (!checkDistance(number)) {err = true; break}
                command += number
                commandName = number + unitName + actionName
                break
                
            case "turn":
                if (!checkAngle(number)) {err = true; break}
                if (direction === "right") {
                    command = `cw ${number}`
                } else if (direction === "left") {
                    command = `ccw ${number}`
                } else {
                    err = true
                }
                commandName = number + unitName + directionName + actionName
                break
                
            case "move":
                if (direction === "") {err = true; break}
                if (!checkDistance(number)) {err = true; break}
                command = `${direction} ${number}`
                commandName = number + unitName + directionName + "に" +  actionName
                break
                
            case "takeoff":
            case "land":
                command = command.trim()
                break
            default:
                err = true
        }
        console.log(command)
        console.log(commandName)
        console.log("")
        
        // send tello
        let message = `命令に誤りがあります！もう一度${REPROMPT_MESSAGE}`
        if (!err) {
            await sendTello("command")
            await sendTello(command)
            message = `ラジャー！${commandName}します！`
        }
        
        // speak
        return handlerInput.responseBuilder
            .speak(message)
            .reprompt("")
            .getResponse()
    }
}



//////// export ////////////////////////////////////////////////////////////////

const skillHandler = async (req, res) => {
    const skill = await Alexa.SkillBuilders.custom()
        .addRequestHandlers(
            ControllHandler,
            LaunchHandler,
            HelpHandler,
            EndHandler,
        )
        .addErrorHandlers(ErrorHandler)
        .create()
    res.json(await skill.invoke(req.body))
}

const app = express()
app.listen(port)
app.use(bodyParser.json(), skillHandler)
