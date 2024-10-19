import axios from 'axios';
import FormData from 'form-data';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import ussdMenuBuilder from './ussdMenuBuilder.mjs';

const fastify = Fastify();

// fastify.register(require('@fastify/multipart'))
await fastify.register(cors, {
    // put your options here
    origin: "*",
});

export const sessions = new Map();

fastify.post('/ussd', async (req, resp) => {
    console.log('body:', req.body);

    const info = req.body;

    let menu_res;

    try {
        menu_res = await ussdMenuBuilder(info);
    } catch(err) {
        resp.type('application/json');
        resp.send(err);
    }
    console.log('resp:', menu_res);
    

    resp.type('application/json');
    resp.send(menu_res);
});

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Server is now listening on ${address}`);
});