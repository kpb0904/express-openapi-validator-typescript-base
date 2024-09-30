import { expect } from 'chai';
import axios from 'axios';
import '../../app';

describe('Pets controller', function () {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/v1',
    validateStatus: undefined
  });

  describe('GET /pets', function () {
    it('should return pets filtered by type', async () => {
      const response = await instance.get('/pets', { params: { type: 'dog', limit: 10 } });
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      response.data.forEach((pet: any) => {
        expect(pet.type).to.equal('dog');
      });
    });

    it('should return pets filtered by type and tags', async () => {
      const response = await instance.get('/pets', { params: { type: 'dog', tags: ['sweet'], limit: 10 } });
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      response.data.forEach((pet: any) => {
        expect(pet.type).to.equal('dog');
        expect(pet.tags).to.deep.equal([ 'sweet' ]);
      });
    });

    it('should return an empty array if no pets match the tags', async () => {
      const response = await instance.get('/pets', { params: { type: 'dog', tags: ['nonexistent'], limit: 10 } });
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array').that.is.empty;
    });


    it('should return pets when multiple tags are provided', async () => {
      const response = await instance.get('/pets', { params: { type: 'dog', tags: ['sweet', 'friendly'], limit: 10 } });
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      response.data.forEach((pet: any) => {
        expect(pet.type).to.equal('dog');
        expect(pet.tags).to.include('sweet');
        expect(pet.tags).to.include('friendly');
      });
    });

  });
});
