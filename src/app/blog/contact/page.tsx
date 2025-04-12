import React from 'react';

export default function Page() {
  return (
    <div>
      <h1 className="text-sky-700">Contact</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, architecto natus,
        cumque laborum, error consequuntur eaque expedita numquam eveniet quas sunt
        possimus eligendi minus omnis sapiente sequi cum magni distinctio?
      </p>
      <div>
        <h2>Get in Touch</h2>
        <ul style={{ listStyleType: "square" }}>
          <li>

            <span>Email: <a href="mailto:lhlahiru95@gmail.com">lhlahiru95@gmail.com</a></span>
          </li>
          <li>
            <span>Website: <a href="https://www.lahiruliyanage.com">www.lahiruliyanage.com</a></span>
          </li>
        </ul>

      </div>
    </div>
  );
}
