import React from 'react';
import { Contributor } from 'app/lmem/contributor';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import ContributorComponent from 'components/organisms/Contributor/ContributorLarge';
import { SettingsState } from '../store/reducers';
import { getContributors } from '../store/selectors/contributors.selectors';
import { connect } from 'react-redux';

const mapStateToProps = (state: SettingsState) => ({
  contributors: getContributors(state)
});

interface Props {
  contributors: Contributor[];
}

const Settings = ({ contributors }: Props) => (
  <>
    <ContributorNav />
    {contributors.map(contributor => (
      <ContributorComponent key={contributor.id} contributor={contributor} />
    ))}
  </>
);

export default connect(mapStateToProps)(Settings);
