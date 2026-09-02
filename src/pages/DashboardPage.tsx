import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Styled } from './DashboardPage.Styled';
import { MobileAppShell } from '../components/layout/MobileAppShell';
import { FilterPills } from '../components/common/FilterPills';
import { PebbleCard } from '../components/vault/PebbleCard';
import { DeleteModal } from '../components/vault/DeleteModal';
import { Button } from '../components/common/Button';
import { useVaultStore } from '../store/useVaultStore';
import { haptic } from '../services/haptics';

export function DashboardPage() {
  const navigate = useNavigate();
  const {
    accounts,
    liveCodes,
    selectedCategory,
    searchQuery,
    setCategory,
    setSearchQuery,
    fetchAccounts,
    startTicker,
    stopTicker,
  } = useVaultStore();

  useEffect(() => {
    fetchAccounts();
    startTicker();
    return () => stopTicker();
  }, [fetchAccounts, startTicker, stopTicker]);

  // Extract unique non-empty categories present across user accounts
  const categories = Array.from(
    new Set(accounts.map((a) => (a.category || '').trim()).filter((c) => Boolean(c) && c.toLowerCase() !== 'all'))
  );

  // Filter accounts by search & category
  const filteredAccounts = accounts.filter((acc) => {
    const query = (searchQuery || '').trim().toLowerCase();
    const matchesSearch =
      !query ||
      (acc.issuer || '').toLowerCase().includes(query) ||
      (acc.accountName || '').toLowerCase().includes(query) ||
      (acc.category || '').toLowerCase().includes(query);

    const isAll = !selectedCategory || selectedCategory.toLowerCase() === 'all';
    const accCategory = (acc.category || '').trim().toLowerCase();
    const matchesCategory = isAll || accCategory === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleFabClick = () => {
    haptic.medium();
    navigate('/add');
  };

  return (
    <MobileAppShell>
      <Styled.SearchWrap>
        <span className="icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search secret pebbles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Styled.SearchWrap>

      {accounts.length > 0 && categories.length > 0 && (
        <FilterPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setCategory}
        />
      )}

      <Styled.CardsList>
        {filteredAccounts.length === 0 ? (
          <Styled.EmptyState>
            <img src="/static/ottie.svg" alt="Ottie" />
            <h3>{searchQuery || selectedCategory !== 'all' ? 'No Matching Pebbles' : 'Your Den is Empty'}</h3>
            <p>
              {searchQuery || selectedCategory !== 'all'
                ? 'Try tweaking your search term or category filter.'
                : 'Start storing your 2FA secret pebbles in encrypted isolation.'}
            </p>
            <Button variant="primary" onClick={() => navigate('/add')}>
              Add First Secret Pebble
            </Button>
          </Styled.EmptyState>
        ) : (
          filteredAccounts.map((account) => (
            <PebbleCard
              key={account.id}
              account={account}
              liveCode={liveCodes[account.id]}
            />
          ))
        )}
      </Styled.CardsList>

      <Styled.FabButton onClick={handleFabClick} title="Add New Pebble">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Styled.FabButton>

      <DeleteModal />
    </MobileAppShell>
  );
}
