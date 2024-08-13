import React, { FC } from "react";
import { getAddressLink } from "../utils";
import styles from "../../styles/AddressLink.module.css";
import { Address } from "../lib/schemas";

interface RenderAddressProps {
  address: Address;
}

export const RenderAddressLink: FC<RenderAddressProps> = ({ address }) => {
  const addressLinks = getAddressLink(address);

  return (
    <>
      <a
        href={addressLinks.googleMaps}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {address.street1}
        {address.street2 && `, ${address.street2}`}, {address.city},{" "}
        {address.state} {address.zipCode}
      </a>
      {addressLinks.appleMaps && (
        <>
          {" | "}
          <a
            href={addressLinks.appleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Open in Apple Maps
          </a>
        </>
      )}
    </>
  );
};
