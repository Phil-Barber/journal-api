const { Client } = require('pg')
const connectionDetails = require('../config/db-connection');
const sampleData = require('./sample-data');

const client = new Client(connectionDetails)

build(true).catch((e) => console.log(e));;

async function build(shouldDelete = false) {
    await client.connect()

    if (shouldDelete) {
        await deleteTables(client);
    }
    await createItems(client, sampleData);
    await client.end()
}

async function deleteTables(client) {
    const res = await client.query(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    );

    return (res.rowCount 
      ? client.query(
          'DROP TABLE ' + 
          res.rows.map(row => {
              return row.tablename;
          }).join(', ')
      )
      : Promise.resolve('No tables')
    );
      
}

async function createItems(client, sampleData) {
    await client.query(
        'CREATE TABLE items (' +
            'id     SERIAL,' +
            'text   VARCHAR(150),' +
            'date   DATE' +
        ')'
    );

    return Promise.all(sampleData.items.map(item => {
        return client.query(
            'INSERT INTO items (text, date) VALUES ($1, $2)',
            [item.text, item.date]
        )
    }));
}

function getDates(n) {
    let start = new Date();
    let dates = [];
    for (let i = 0; i < n; i++) {
        let d = new Date();
        d.setDate(start.getDate() + i);
        dates.push(d);
    }
    return dates;
}
