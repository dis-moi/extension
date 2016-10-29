import chai from 'chai';

import {serialize, deserialize} from '../../../src/app/lmem/reduxPersistTransform';

const expect = chai.expect;

const stateWithOneOffer = {
  offers: [
    {
      "id":4,
      "recommendation": {
        "id":4,
        "visibility": "public",
        "alternatives": [
          {
            "id":4,"url_to_redirect":"http://a.b/c",
            "label":"Voir l’article"
          }
        ],
        "matching_contexts":[],
        "criteria":[{"id":5,"label":"risk","description":"Risque"}],
        "title":"Site e-commerce à risque",
        "description":"azerty"
      },
      "url_regex":"azerty.(fr|com).*",
      "description":"azerty"
    }
  ]
};

const stateWithAlwaysDeactivateWebsitePref = {
  preferences: {
    deactivated: {
      deactivatedWebsites : new Set([
        'www.samsung.com'
      ])
    }
  }
}


const stateWithDeactivateUntilPref = {
  preferences: {
    deactivated: {
      deactivatedEverywhereUntil : 1462701600000
    }
  }
}


describe('marshmalling', function () {

  describe('serialize', () => {
    it('should be an empty JSON object for an empty object', () => {
      expect( serialize({}) ).to.eql('{}');
    })
    
    it('should serialize an offer', () => {
      expect( serialize(stateWithOneOffer) )
      .to.eql( JSON.stringify(stateWithOneOffer) )
    })
    
    it('should serialize state with deactivatedWebsites preference', () => {
      expect( serialize(stateWithAlwaysDeactivateWebsitePref) )
      .to.eql( '{"preferences":{"deactivated":{"deactivatedWebsites":["www.samsung.com"]}}}' )
    })
    
    it('should serialize state with deactivatedEverywhereUntil preference', () => {
      expect( serialize(stateWithDeactivateUntilPref) )
      .to.eql( '{"preferences":{"deactivated":{"deactivatedEverywhereUntil":1462701600000}}}' )
    })
    
  })

  describe('deserialize', () => {
    it('should be an empty object for an empty JSON object', () => {
      expect( deserialize(serialize({})) ).to.deep.equal( {} );
    })
    
    it('should deserialize an offer', () => {
      expect( deserialize(serialize(stateWithOneOffer)) )
      .to.deep.equal( stateWithOneOffer )
    })
    
    it('should deserialize state with deactivatedWebsites preference', () => {
      const bfState = deserialize(serialize(stateWithAlwaysDeactivateWebsitePref));

      expect( bfState )
      .to.deep.equal( stateWithAlwaysDeactivateWebsitePref )

      expect( Object.prototype.toString.call(bfState.preferences.deactivated.deactivatedWebsites) ).to.equal('[object Set]')

      // chai does not support ES6 Sets, so converting to array for comparison
      // https://github.com/Automattic/expect.js/pull/144
      expect( [...bfState.preferences.deactivated.deactivatedWebsites] )
      .to.eql( [...stateWithAlwaysDeactivateWebsitePref.preferences.deactivated.deactivatedWebsites] )

      
    })
    
    it('should deserialize state with deactivatedEverywhereUntil preference', () => {
      expect( deserialize(serialize(stateWithDeactivateUntilPref)) )
      .to.deep.equal( stateWithDeactivateUntilPref )
    })
    
  })

});