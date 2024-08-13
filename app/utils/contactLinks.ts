export const getPhoneLink = (phone: string): string => {
  return `tel:${phone}`;
};

export const getAddressLink = (address: any) => {
  const street2 = address.street2 ? `, ${address.street2}` : "";
  const encodedAddress = encodeURIComponent(
    `${address.street1}${street2}, ${address.city}, ${address.state} ${address.zipCode}`,
  );

  const isIOS = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isIOS) {
    return {
      googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      appleMaps: `http://maps.apple.com/?q=${encodedAddress}`,
    };
  } else if (isAndroid) {
    return {
      googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    };
  } else {
    return {
      googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    };
  }
};
