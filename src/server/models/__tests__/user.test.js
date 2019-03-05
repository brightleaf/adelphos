const User = require('../user')
let user
describe('The User Model', async () => {
  afterEach(async () => {
    await user.destroy()
  })
  it('should create a user', async () => {
    user = new User({
      firstName: 'Tester',
      lastName: 'McTester',
      role: 'member',
      email: 'testermctester@example.com',
    })
    const result = await user.save()
    expect(result).not.toBeNull()
  })
  it('should create a user and then update', async () => {
    user = new User({
      firstName: 'Tester2',
      lastName: 'McTester',
      role: 'leader',
      email: 'testermctester2@example.com',
    })
    const result = await user.save()
    expect(result).not.toBeNull()
    user.set('firstName', 'Deuce')
    const result2 = await user.save(null, { method: 'update' })
    expect(result2).not.toBeNull()
  })
})
