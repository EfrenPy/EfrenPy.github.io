const vCardsJS = require('vcards-js');
const vCard = vCardsJS();

vCard.firstName = 'Efrén';
vCard.lastName = 'Rodríguez Rodríguez';
vCard.email = 'efrenrguezrguez@gmail.com';
vCard.title = 'Postdoctoral Researcher';
vCard.organization = 'CERN';
vCard.url = 'https://efrenrodriguezrodriguez.com/';
vCard.socialUrls['linkedin'] = 'https://www.linkedin.com/in/efrenrguezrguez';
vCard.workAddress.city = 'Geneva';
vCard.workAddress.countryRegion = 'Switzerland';

vCard.saveToFile('./efren-rodriguez.vcf');
console.log('vCard saved to efren-rodriguez.vcf');
