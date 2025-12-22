// Quick script to clear periodic reports collection
db.getCollection('periodic-reports').deleteMany({});
console.log('✅ All periodic reports deleted. Restart the backend to re-seed.');
