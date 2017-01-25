import chai from 'chai';
var chaiImmutable = require('chai-immutable');
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import fromJS from '../../../utils/customFromJS'
import { serialize, deserialize } from '../../../src/app/lmem/reduxPersistTransform';

chai.use(chaiImmutable);
const expect = chai.expect;

const stateWithOneOffer = fromJS({
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
});

const stateWithAlwaysDeactivateWebsitePref = fromJS({
  websites: {
    deactivated: {
      deactivatedWebsites : [
        'www.samsung.com'
      ]
    }
  }
});


const stateWithDeactivateUntilPref = fromJS({
  websites: {
    deactivated: {
      everywhereUntil : 1462701600000
    }
  }
});

const critOrEditPartOfState = new ImmutableMap({
    id: new ImmutableMap({ id: 'myID', label: 'myLabel' })
});


describe('marshmalling', function () {

  describe('serialize', () => {
    it('should be an empty JSON object for an empty object', () => {
      expect( serialize({}) ).to.eql('{}');
    });
    
    it('should serialize an offer', () => {
      expect( serialize(stateWithOneOffer) )
      .to.eql( JSON.stringify(stateWithOneOffer) )
    });
    
    it('should serialize state with deactivatedWebsites preference', () => {
      expect( serialize(stateWithAlwaysDeactivateWebsitePref) )
      .to.eql( '{"websites":{"deactivated":{"deactivatedWebsites":["www.samsung.com"]}}}' )
    });
    
    it('should serialize state with deactivatedEverywhereUntil preference', () => {
      expect( serialize(stateWithDeactivateUntilPref) )
      .to.eql( '{"websites":{"deactivated":{"everywhereUntil":1462701600000}}}' )
    });
    
  });

  describe('deserialize', () => {
    it('should be an empty Map for an empty JSON object', () => {
      expect( deserialize(serialize({})) ).to.equal( new ImmutableMap() );
    });
    
    it('should deserialize an offer', () => {
      expect( deserialize(serialize(stateWithOneOffer)) )
      .to.equal( stateWithOneOffer )
    });
    
    it('should deserialize state with deactivatedWebsites preference', () => {
      const bfState = deserialize(serialize(stateWithAlwaysDeactivateWebsitePref));

      expect( bfState )
      .to.deep.equal( stateWithAlwaysDeactivateWebsitePref )

      expect( bfState.get('websites').get('deactivated').get('deactivatedWebsites'))
      .to.be.an.instanceof(ImmutableSet);
    });
    
    it('should deserialize state with deactivatedEverywhereUntil preference', () => {
      expect( deserialize(serialize(stateWithDeactivateUntilPref)) )
      .to.deep.equal( stateWithDeactivateUntilPref )
    });

    it('should deserialize state with criteria', () => {
      expect( deserialize(serialize(critOrEditPartOfState), 'criteria') )
      .to.deep.equal( critOrEditPartOfState )
    });

    it('should deserialize state with editors', () => {
      expect( deserialize(serialize(critOrEditPartOfState), 'editors') )
      .to.deep.equal( critOrEditPartOfState )
    });
    
  });

});