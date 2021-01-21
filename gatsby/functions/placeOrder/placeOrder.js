const nodemailer = require('nodemailer');

function generateorderEmail({ order, total }) {
  return `<div>
  <h2>Your Recent Order for ${total} </h2>
  <p>We'll start boxing up your order right away. Come on down an pick it up. </p>
  <ul>
    ${order
      .map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}"/>
      ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
  </ul>
  <p> Your total is <strong>${total}</strong> due at pickup </p>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // validate incoming data
  //  await wait(5000);
  const body = JSON.parse(event.body);
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field!`,
        }),
      };
    }
  }
  // check if they have filed out honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop Beep good-bye. ERR: 120807' }),
    };
  }

  // check for 0 length order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You need to have at least one item in your order!`,
      }),
    };
  }
  // send the email

  // send the success or error message

  // Test send an email
  const info = await transporter.sendMail({
    from: 'bauccus atlas <atlas@example.com',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateorderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
