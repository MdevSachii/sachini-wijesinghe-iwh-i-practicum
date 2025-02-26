const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-69be143c-9eb4-40ed-9966-d620d2946b51';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 
*/

app.get('/', async (req, res) => {
    const book = 'https://api.hubapi.com/crm/v3/objects/book/?properties=book_name&properties=auther&properties=book_price&archived=false';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(book, { headers });
        const data = resp.data.results;
        res.render('books', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});

// Book add view
app.get('/add', async (req, res) => {
    res.render('add_books', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/add', async (req, res) => {
    const add = {
        properties: {
            "book_name": req.body.bookName,
            "auther": req.body.bookAuther,
            "book_price": req.body.bookPrice,
        }
    }

    const addBooks = `https://api.hubapi.com/crm/v3/objects/book`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(addBooks, add, { headers } );
        const book = 'https://api.hubapi.com/crm/v3/objects/book/?properties=book_name&properties=auther&properties=book_price&archived=false';
        const resp = await axios.get(book, { headers });
        const data = resp.data.results;
        res.render('books', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });
    } catch(err) {
        console.error(err);
    }
});

// Books update table view
app.get('/book-update', async (req, res) => {
    const book = 'https://api.hubapi.com/crm/v3/objects/book/?properties=book_name&properties=auther&properties=book_price&archived=false';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(book, { headers });
        const data = resp.data.results;
        res.render('update_book', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});


// Book update view
app.get('/update-cobj', async (req, res) => {

    const id = req.query.ObjectId;

    const getBook = `https://api.hubapi.com/crm/v3/objects/book/${id}?properties=book_name,auther,book_price`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getBook, { headers });
        const data = response.data;

        res.render('edit_book', {book_Name: data.properties.book_name, book_auther: data.properties.auther, book_Price: data.properties.book_price});
        
    } catch(err) {
        console.error(err);
    }
});

app.post('/update-cobj', async (req, res) => {
    
    const update = {
        properties: {
            "book_name": req.body.bookName,
            "auther": req.body.bookAuther,
            "book_price": req.body.bookPrice,
        }
    }

    const id = req.query.ObjectId;
    const updateBook = `https://api.hubapi.com/crm/v3/objects/book/${id}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateBook, update, { headers } );
        const book = 'https://api.hubapi.com/crm/v3/objects/book/?properties=book_name&properties=auther&properties=book_price&archived=false';
        const resp = await axios.get(book, { headers });
        const data = resp.data.results;
        res.render('books', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });    
    } catch(err) {
        console.error(err);
    }

});

// Testing contact in folk master
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

app.get('/update', async (req, res) => {
    // http://localhost:3000/update?email=wijesinghesachini09@gmail.com
    const email = req.query.email;

    const getContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email&properties=email,nic_number`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getContact, { headers });
        const data = response.data;

        // res.json(data);
        res.render('update', {userEmail: data.properties.email, nicNumber: data.properties.nic_number});
        
    } catch(err) {
        console.error(err);
    }
});

app.post('/update', async (req, res) => {
    
    const update = {
        properties: {
            "nic_number": req.body.newNicVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});



// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));