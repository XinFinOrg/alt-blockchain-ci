import { ACCOUNT_3 } from "../utils";

before(() => {
  // Import Account 2 0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60
  cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
  cy.switchMetamaskAccount(1);
  cy.addMetamaskNetwork({
    networkName: 'Polygon Mumbai', 
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/QSv6dciCkBm2dwLyCOsJwqqwM-tJzP3m', 
    chainId: '80001', 
    symbol: 'MATIC', 
    blockExplorer: 'https://mumbai.polygonscan.com', 
    isTestnet: true
  })
});

describe("Endorse Transfer of Ownership/Holdership", () => {
  it("should endorse transfer of both owner and holder successfully", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("polygon/wrapped/ebl-endorse-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.clickConnectAndManageAssetButton(true); // approve all accounts to application once after connect to wallet, subsequent tests no longer need `true`
    cy.get("[data-testid='endorseTransferDropdown']").click(); // Endorse Transfer of Ownership/Holdership
    cy.get("[data-testid='editable-input-owner']").clear();
    cy.get("[data-testid='editable-input-holder']").clear();
    cy.get("[data-testid='editable-input-owner']").type(ACCOUNT_3);
    cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_3);
    cy.get("[data-testid='endorseTransferBtn']").click();
    cy.confirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
  });
});
