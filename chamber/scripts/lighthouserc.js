module.exports = {
    ci: {
        collect: {
            url: ['http://localhost/chamber/directory.html'],
            numberOfRuns: 3
        },
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                'categories:performance': ['warn', { minScore: 0.8 }],
                'timing-total-blocking-time': ['warn', { maxNumericValue: 300 }]
            }
        }
    }
};