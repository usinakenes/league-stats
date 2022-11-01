let regionsToContinentsMap = new Map()

regionsToContinentsMap.set('NA', 'americas')
regionsToContinentsMap.set('BR', 'americas')
regionsToContinentsMap.set('LAN', 'americas')
regionsToContinentsMap.set('LAS', 'americas')

regionsToContinentsMap.set('KR', 'asia')
regionsToContinentsMap.set('JP', 'asia')

regionsToContinentsMap.set('EUNE', 'europe')
regionsToContinentsMap.set('EUW', 'europe')
regionsToContinentsMap.set('TR', 'europe')
regionsToContinentsMap.set('RU', 'europe')

regionsToContinentsMap.set('OCE', 'sea')

let regionsToRegionPrefixes = new Map()

regionsToRegionPrefixes.set('NA', 'na1')
regionsToRegionPrefixes.set('BR', 'br1')
regionsToRegionPrefixes.set('LAN', 'la1')
regionsToRegionPrefixes.set('LAS', 'la2')

regionsToRegionPrefixes.set('KR', 'kr')
regionsToRegionPrefixes.set('JP', 'jp1')

regionsToRegionPrefixes.set('EUNE', 'eun1')
regionsToRegionPrefixes.set('EUW', 'euw1')
regionsToRegionPrefixes.set('TR', 'tr1')
regionsToRegionPrefixes.set('RU', 'ru')

regionsToRegionPrefixes.set('OCE', 'oc1')

export {regionsToContinentsMap, regionsToRegionPrefixes} 
