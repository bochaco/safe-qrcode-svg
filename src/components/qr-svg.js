import React from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';

const QRCodeImpl = require('qr.js/lib/QRCode');
const ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel');

export function SAFEQRCode({
    value = '',
    level = 'L',
    bgColor = '#FFFFFF',
    fgColor = '#5b91cc',
    logoColor = '#5b91cc',
    connsDensity = 'N',
    asImg = false,
    ...otherProps
} = {}) {
    // adapted from https://github.com/zpao/qrcode.react/blob/master/src/index.js
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
    qrcode.addData(value);
    qrcode.make();

    const cells = qrcode.modules;
    const radius = 10;
    const diameter = 2 * radius;
    const cornerLength = 7;
    const logoLocation = Math.floor(radius * cells.length) - (diameter * 3);
    /* TODO: support to choose which logo to place in the middle
    // The follwing code is to place the SAFE Network mark and the logo in the center
    const logoHeight = diameter * 7;
    const logoWidth = logoHeight * 2.6;
    const safeNetworkMark = (
      <svg x={logoLocation} y={logoLocation} width={logoWidth} height={logoHeight} viewBox={`0 0 ${logoWidth} ${logoHeight}`}><g><g transform="translate(0 13.85)"><circle cx="7" cy="31" r="7" fill={logoColor}/><circle cx="7" cy="55" r="7" fill={logoColor}/><circle cx="7" cy="79" r="7" fill={logoColor}/><circle cx="27.785" cy="19" r="7" fill={logoColor}/><circle cx="27.785" cy="43" r="7" fill={logoColor}/><circle cx="27.785" cy="67" r="7" fill={logoColor}/><circle cx="27.785" cy="91" r="7" fill={logoColor}/><circle cx="48.569" cy="7" r="7" fill={logoColor}/><circle cx="48.569" cy="31" r="7" fill={logoColor}/><circle cx="48.569" cy="55" r="7" fill={logoColor}/><circle cx="48.569" cy="79" r="7" fill={logoColor}/><circle cx="48.569" cy="103" r="7" fill={logoColor}/><circle cx="69.354" cy="19" r="7" fill={logoColor}/><circle cx="69.354" cy="43" r="7" fill={logoColor}/><circle cx="69.354" cy="67" r="7" fill={logoColor}/><circle cx="69.354" cy="91" r="7" fill={logoColor}/><circle cx="90.138" cy="31" r="7" fill={logoColor}/><circle cx="90.138" cy="55" r="7" fill={logoColor}/><circle cx="90.138" cy="79" r="7" fill={logoColor}/><path fill={logoColor} d="M10 31v24H4V31zM30.785 19v24h-6V19zM30.785 43v24h-6V43zM51.57 7v24h-6V7zM51.57 55v24h-6V55zM51.57 79v24h-6V79zM8.5 28.402l20.784 12-3 5.196-20.784-12zM29.285 40.402l20.784 12-3 5.196-20.785-12zM50.07 28.402l20.783 12-3 5.196-20.784-12zM70.854 40.402l20.784 12-3 5.196-20.784-12zM70.854 16.402l20.784 12-3 5.196-20.784-12zM70.854 64.402l20.784 12-3 5.196-20.784-12zM5.5 76.402l20.784-12 3 5.196-20.784 12zM47.07 100.402l20.783-12 3 5.196-20.784 12zM47.07 52.402l20.783-12 3 5.196-20.784 12zM67.854 40.402l20.784-12 3 5.196-20.784 12zM26.285 88.402l20.784-12 3 5.196-20.785 12zM47.07 76.402l20.783-12 3 5.196-20.784 12z"/></g><g fill={logoColor}><path d="M121.904 0h1.14v137.72h-1.14z"/><path d="M170.176 66.082c3.8 0 6.852-.88 9.066-2.637a8.352 8.352 0 0 0 3.348-6.937 8.655 8.655 0 0 0-2.344-6.266 8.9 8.9 0 0 0-2.594-1.586 21.08 21.08 0 0 0-5.89-1.344 16.936 16.936 0 0 1-4.35-.828c-1.335-.465-1.92-1.22-1.92-2.262 0-2 1.464-2.883 4.933-2.883a5.025 5.025 0 0 1 4.934 2.752c.627 1.133 1.037 1.344 2.17.836l3.176-1.376c1.21-.508 1.465-1.09.918-2.254-1.965-4.184-5.227-6.15-11.2-6.15-7.566 0-11.914 3.8-11.914 9.364a8.288 8.288 0 0 0 2.59 6.352 8.81 8.81 0 0 0 2.845 1.508 18.572 18.572 0 0 0 2.97.793c.788.125 1.835.293 3.175.457 3.637.38 5.64 1.133 5.64 3.012 0 2.215-1.835 3.3-5.554 3.3q-4.078 0-5.39-2.883c-.548-1.292-1.01-1.46-2.216-1l-3.055 1.083c-1.168.465-1.46.965-1.086 2.176 1.67 4.513 5.6 6.77 11.745 6.77zm37.883-2.176c.373 1.21 1.045 1.547 3.09 1.547h3.14c1.163 0 1.542-.543 1.124-1.672l-9.992-26.662c-.37-1.047-.875-1.336-2.09-1.336h-3.215c-1.215 0-1.715.29-2.09 1.423l-9.992 26.578c-.418 1.13-.04 1.673 1.13 1.673h2.886c2.048 0 2.59-.336 3.05-1.547l1.34-3.93h10.318zm-9.82-9.445l2.17-6.52a17.278 17.278 0 0 0 .957-5.93h.422l.042.79a25.325 25.325 0 0 0 1 5.185l2.176 6.476h-6.77zm30.48-.334h9.607c1.3 0 1.72-.375 1.72-1.668v-2.8c0-1.3-.42-1.715-1.72-1.715h-9.61v-5.978h11.7c1.3 0 1.72-.375 1.72-1.672v-2.8c0-1.293-.422-1.71-1.72-1.71h-16.8c-1.3 0-1.714.417-1.714 1.71v26.25c0 1.293.418 1.71 1.715 1.71h3.386c1.3 0 1.71-.417 1.71-1.71zm41.854 9.617v-2.8c0-1.215-.5-1.715-1.715-1.715H256.74v-5.69h9.61c1.3 0 1.71-.413 1.71-1.706v-2.8c0-1.3-.41-1.67-1.71-1.67h-9.61v-5.4h11.7c1.293 0 1.715-.376 1.715-1.673v-2.8c0-1.294-.422-1.71-1.715-1.71h-16.8c-1.293 0-1.715.416-1.715 1.71v26.25c0 1.293.422 1.71 1.715 1.71h17.217c1.296.003 1.714-.415 1.714-1.708zm-83.66 14.324H185.9c-.457 0-.66.2-.66.613v22.91c0 1.27.05 2.944.2 5.026.1 2.086.156 3.453.156 4.117h-.1c-.355-.512-1.066-1.625-2.082-3.3q-1.6-2.514-2.594-3.965l-17.53-25.046a.763.763 0 0 0-.71-.355h-1.013c-.46 0-.664.2-.664.66v34.75c0 .457.2.66.664.66h1.012c.41 0 .61-.2.61-.66V89.8c0-1.164-.054-2.742-.15-4.676s-.153-3.145-.153-3.7h.1a32.11 32.11 0 0 1 1.88 2.992 36.358 36.358 0 0 0 2.233 3.61l18.036 25.706a.81.81 0 0 0 .71.406h1.067c.406 0 .61-.2.61-.66V78.726c0-.457-.202-.66-.608-.66zm23.187 9.3c-7.11 0-10.976 3.96-10.976 10.617v6.86c0 6.245 3.61 10 10.672 10q7.7 0 10.82-5.79c.258-.406.2-.71-.2-.914l-.71-.407a.63.63 0 0 0-.915.254c-1.827 3.3-4.827 4.98-8.99 4.98-5.536 0-8.485-3-8.485-7.926v-3.455h18.594c.765 0 1.167-.355 1.167-1.12v-2.59c-.003-6.448-3.812-10.507-10.978-10.507zm8.79 12.445h-17.58V97.78c0-5.28 3.05-8.485 8.79-8.485s8.79 3.2 8.79 8.484zm25.778-11.686h-8.07v-5.538c0-.355-.2-.56-.613-.56h-.965c-.406 0-.6.2-.6.56v5.54h-5.502a.508.508 0 0 0-.56.558v.867a.51.51 0 0 0 .56.56h5.492v14.78c0 3.86.758 6.5 2.23 7.876 1.473 1.42 4.117 2.132 7.926 2.08a.535.535 0 0 0 .61-.604v-.867a.54.54 0 0 0-.61-.61c-3.1 0-5.23-.508-6.3-1.574-1.117-1.016-1.676-3.152-1.676-6.348V90.11h8.074c.41 0 .613-.2.613-.56v-.867c.002-.355-.2-.558-.61-.558zm41.362 0h-.707c-.563 0-.922.2-1.02.56l-5.484 17.784c-.15.56-.355 1.418-.613 2.59-.3 1.164-.508 1.98-.656 2.387h-.104c-.152-.355-.355-1.168-.66-2.336s-.56-2.03-.762-2.695l-5.59-16.97c-.152-.452-.3-.558-.914-.558h-.507c-.656 0-.813.055-.965.613l-5.637 17.116c-.15.56-.41 1.375-.662 2.54a22.24 22.24 0 0 1-.66 2.288h-.1a20.49 20.49 0 0 1-.613-2.387 24.41 24.41 0 0 0-.61-2.387l-5.538-17.938c-.1-.406-.453-.61-1.012-.61h-.762c-.508 0-.664.157-.46.665l7.823 24.992a.8.8 0 0 0 .766.607h.763a.848.848 0 0 0 .81-.61l5.894-18.335c.2-.613.405-1.375.663-2.34.25-.914.356-1.422.4-1.523h.157c.047.2.2.757.453 1.624.2.914.406 1.676.56 2.238l6 18.336a.85.85 0 0 0 .812.608h.762a.816.816 0 0 0 .816-.61l7.82-24.99c.15-.46.104-.663-.458-.663zm20.09-.758c-6.652 0-10.87 3.453-10.87 8.938v9.656c0 5.484 4.218 8.887 10.87 8.887 6.707 0 10.926-3.4 10.926-8.888V96.3c0-5.53-4.22-8.933-10.926-8.933zm8.742 18.594c0 4.262-3.453 6.906-8.742 6.906-5.23 0-8.688-2.69-8.688-6.906v-9.706c0-4.215 3.457-6.906 8.688-6.906 5.29 0 8.742 2.637 8.742 6.906zm26.03-18.594h-1.573a24.383 24.383 0 0 0-9.043 1.625c-1.578.657-1.934 1.22-1.934 2.79v21.75a.537.537 0 0 0 .61.605h1.015c.354 0 .558-.2.558-.605v-21.14a1.763 1.763 0 0 1 1.066-1.68 21.24 21.24 0 0 1 7.676-1.32h1.625c.355 0 .56-.2.56-.604v-.818c0-.407-.204-.606-.56-.606zm30.34 26.11l-4.675-9.3a6.747 6.747 0 0 0-4.778-4.067l9.042-11.324c.355-.46.254-.664-.406-.664h-.864a1.327 1.327 0 0 0-1.168.462l-8.84 11.172h-6.656V77.152a.538.538 0 0 0-.61-.61h-.964a.538.538 0 0 0-.61.61v36.38a.537.537 0 0 0 .61.604h.965a.537.537 0 0 0 .61-.605v-11.79h6.4a5.27 5.27 0 0 1 5.385 3.355l4.218 8.535a.944.944 0 0 0 .965.508h1.016c.453 0 .554-.202.355-.66z" transform="translate(-8.667 -6.141)"/></g></g></svg>
    );*/

    const logoHeight = diameter * 6;
    const logoWidth = diameter * 7;
    const safeNetworkLogo = (
      <svg x={logoLocation} y={logoLocation} width={logoWidth} height={logoHeight} viewBox={`0 0 ${logoWidth} ${logoHeight}`}>
        <circle cx="7" cy="31" r="7" fill={logoColor}/>
        <circle cx="7" cy="55" r="7" fill={logoColor}/>
        <circle cx="7" cy="79" r="7" fill={logoColor}/>
        <circle cx="27.46" cy="19" r="7" fill={logoColor}/>
        <circle cx="27.46" cy="43" r="7" fill={logoColor}/>
        <circle cx="27.46" cy="67" r="7" fill={logoColor}/>
        <circle cx="27.46" cy="91" r="7" fill={logoColor}/>
        <circle cx="48.92" cy="7" r="7" fill={logoColor}/>
        <circle cx="48.92" cy="31" r="7" fill={logoColor}/>
        <circle cx="48.92" cy="55" r="7" fill={logoColor}/>
        <circle cx="48.92" cy="79" r="7" fill={logoColor}/>
        <circle cx="48.92" cy="103" r="7" fill={logoColor}/>
        <circle cx="69.38" cy="19" r="7" fill={logoColor}/>
        <circle cx="69.38" cy="43" r="7" fill={logoColor}/>
        <circle cx="69.38" cy="67" r="7" fill={logoColor}/>
        <circle cx="69.38" cy="91" r="7" fill={logoColor}/>
        <circle cx="90.84" cy="31" r="7" fill={logoColor}/>
        <circle cx="90.84" cy="55" r="7" fill={logoColor}/>
        <circle cx="90.84" cy="79" r="7" fill={logoColor}/>
        <path fill={logoColor} d="M10 31v24H4V31zM30.46 19v24h-6V19zM30.46 43v24h-6V43zM51.92 7v24h-6V7zM51.92 55v24h-6V55zM51.92 79v24h-6V79zM8.5 28.402l20.784 12-3 5.196-20.784-12zM28.96 40.402l20.784 12-3 5.196-20.784-12zM50.42 28.402l20.784 12-3 5.196-20.784-12zM70.88 40.402l20.784 12-3 5.196-20.784-12zM70.88 16.402l20.784 12-3 5.196-20.784-12zM70.88 64.402l20.784 12-3 5.196-20.784-12zM5.5 76.402l20.784-12 3 5.196-20.784 12zM47.42 100.402l20.784-12 3 5.196-20.784 12zM47.42 52.402l20.784-12 3 5.196-20.784 12zM67.88 40.402l20.784-12 3 5.196-20.784 12zM25.96 88.402l20.784-12 3 5.196-20.784 12zM47.42 76.402l20.784-12 3 5.196-20.784 12z"/>
      </svg>
    );

    const cornersPosition = [
        { x: 0, y: 0 },
        { x: 0, y: (radius * 2 * cells.length) - (diameter * cornerLength) },
        { x: (radius * 2 * cells.length) - (diameter * cornerLength), y: 0 }
    ];

    let keyIndex = 0; // we use simple order as a key just to avoid the key warning here
    const cornersRect = cornersPosition.map((position) => (
      <rect key={keyIndex++}
        x={position.x} y={position.y}
        rx={15} ry={15}
        height={diameter * (cornerLength-1)}
        width={diameter * (cornerLength-1)}
        style={{ stroke: fgColor, strokeWidth: diameter, fill: 'none' }}
      />
    ));

    const cornersCircle = cornersPosition.map((position) => (
      <circle key={keyIndex++}
        cx={diameter * 3 + position.x}
        cy={diameter * 3 + position.y}
        r={3 * radius}
        style={{ fill: fgColor }}
      />
    ));

    // Randomly pick where to place a connector between two dots,
    // as well as randomly choose the direction of the connector
    let randomConns = Array.from({length: cells.length}, () => []);
    const connDirection = [
      {col: 0, row: -1},
      {col: 1, row: -1},
      {col: 1, row: 0},
      {col: 1, row: 1},
      {col: 0, row: 1},
      {col: -1, row: 1},
      {col: -1, row: 0},
      {col: -1, row: -1},
    ]
    const matrixSize = Math.pow(cells.length, 2);
    const connectorsDensity = {N: 0, L: 1, M: 2, H: 3};
    const numRandomDots = connectorsDensity[connsDensity] * matrixSize;
    Array.from({length: numRandomDots}, () => Math.floor((Math.random() * matrixSize))).forEach(index => {
      const row = Math.floor(index / cells.length);
      const col = index - row * cells.length;
      const direction = Math.floor((Math.random() * 8));
      randomConns[row][col] = connDirection[direction];
    })

    const logoStarts = Math.floor(logoLocation / diameter);
    const logoEnds = Math.floor((logoLocation + logoHeight) / diameter);
    let dotConnectors = [];
    let dots = [];
    cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Don't put dots at the position markers corners, or where the logo is to be placed
        /* Condition if safeNetworkMark is used instead of safeNetworkLogo:
         * if ((rowIndex <= logoStarts || rowIndex > logoEnds || colIndex < logoStarts)
        */
        if ((rowIndex < logoStarts || rowIndex > logoEnds || colIndex < logoStarts || colIndex > logoEnds)
                  && ((rowIndex > cornerLength || colIndex > cornerLength)
                    && (rowIndex > cornerLength || colIndex < (cells.length - cornerLength))
                    && (rowIndex < (cells.length - cornerLength) || colIndex > cornerLength)
                  )) {
          // Add connector if this dot was randomly picked to have it
          const connectorDirection = randomConns[rowIndex][colIndex];
          if (cell && connectorDirection) {
            const targetCol = (colIndex + connectorDirection.col);
            const targetRow = (rowIndex + connectorDirection.row);
            if (targetRow >=0 && targetRow < cells.length
                && cells[targetRow][targetCol]
                /* Condition if safeNetworkMark is used instead of safeNetworkLogo:
                 * && (targetCol < logoStarts || targetRow <= logoStarts || targetRow > logoEnds)
                */
                && (targetCol < logoStarts || targetCol > logoEnds
                    || targetRow < logoStarts || targetRow > logoEnds)
              ) {
                dotConnectors.push(
                  <line key={keyIndex++}
                    x1={diameter * colIndex}
                    y1={diameter * rowIndex}
                    x2={diameter * targetCol}
                    y2={diameter * targetRow}
                    style={{ stroke: fgColor, strokeWidth: Math.floor(0.7 * radius)}}
                  />);
            }
          }

          dots.push(
            <circle key={keyIndex++}
              cx={diameter * colIndex}
              cy={diameter * rowIndex}
              r={radius}
              style={{ fill: cell ? fgColor : bgColor }}
            />);
        }
      });
    });

    const viewBoxSizes = [-1 * radius, -1 * radius, diameter * cells.length, diameter * cells.length];
    const svgComp = (
      <svg xmlns='http://www.w3.org/2000/svg' shapeRendering="crispEdges" viewBox={viewBoxSizes.join(' ')} {...otherProps}>
        {dots}
        {dotConnectors}
        {safeNetworkLogo}
        {cornersRect}
        {cornersCircle}
      </svg>
    );

    if (asImg === false) {
      return svgComp;
    }

    const svgString = encodeURIComponent(renderToStaticMarkup(svgComp));
    return (<img alt="SAFE Network QR Code" src={`data:image/svg+xml,${svgString}`} {...otherProps} />);
}

SAFEQRCode.propTypes = {
    value: PropTypes.string.isRequired,
    level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
    connsDensity: PropTypes.oneOf(['N', 'L', 'M', 'H']),
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    logoColor: PropTypes.string,
    asImg: PropTypes.bool,
};
