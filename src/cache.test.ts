import CacheService from './cache';

describe('CacheService', () => {
  it('should set and get a value from cache', async () => {
    await CacheService.set('testKey', { propA: 'valueA', propB: 'valueB' }, 60);
    const value = await CacheService.get('testKey');
    expect(value).toStrictEqual({ propA: 'valueA', propB: 'valueB' });
  });

  it('should delete a value from cache', async () => {
    await CacheService.set('testKey', { propA: 'valueA', propB: 'valueB' }, 60);
    await CacheService.del('testKey');
    const value = await CacheService.get('testKey');
    expect(value).toBeNull();
  });
});
