"use strict";

describe('alt.endpoint-ping', function() {
  var _rootScope, _altPing, _httpBackend, _provider;

  beforeEach(module('alt.endpoint-ping', function(altPingProvider) {
    _provider = altPingProvider;
  }));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _httpBackend = $injector.get('$httpBackend');
    _altPing = $injector.get('altPing');
  }));

  describe('criação', function() {
    it('deve retornar uma função', function() {
      expect(typeof _altPing).toBe('function');
    })
  });

  describe('ping', function() {
    it('NÃO deve chamar o endpoint, o mesmo não foi informado', function() {
      var _endpoint = undefined;

      _provider.url = _endpoint;

      _altPing(_endpoint)
        .then(function() {
          expect(true).toBe(false);
        })
        .catch(function(erro) {
          expect(erro).toBeDefined();
          expect(erro instanceof TypeError).toBe(true);
          expect(erro.message).toEqual('String do endpoint deve ser informada.');
        });

      _rootScope.$digest();
    })

    it('NÃO deve chamar o endpoint, o mesmo não é uma string', function() {
      var _endpoint = 1;

      _provider.url = _endpoint;

      _altPing(_endpoint)
        .then(function() {
          expect(true).toBe(false);
        })
        .catch(function(erro) {
          expect(erro).toBeDefined();
          expect(erro instanceof TypeError).toBe(true);
          expect(erro.message).toEqual('String do endpoint deve ser informada.');
        });

      _rootScope.$digest();
    })

    it('NÃO deve chamar o endpoint, o mesmo é uma string vazia', function() {
      var _endpoint = '';

      _provider.url = _endpoint;

      _altPing(_endpoint)
        .then(function() {
          expect(true).toBe(false);
        })
        .catch(function(erro) {
          expect(erro).toBeDefined();
          expect(erro instanceof TypeError).toBe(true);
          expect(erro.message).toEqual('String do endpoint deve ser informada.');
        });

      _rootScope.$digest();
    })

    it('deve chamar o endpoint, e o mesmo retorna erro', function() {
      var _endpoint = '/a';
      var _erro = {a: true};

      _provider.url = _endpoint;

      _httpBackend.expectPOST(_endpoint, null).respond(400, _erro);

      _altPing(_endpoint)
        .then(function() {
          expect(true).toBe(false);
        })
        .catch(function(erro) {
          expect(erro.data.a).toEqual(_erro.a);
        });

      _httpBackend.flush();
    })

    it('deve chamar o endpoint corretamente', function() {
      var _endpoint = '/a';
      var _erro = {a: true};

      _provider.url = _endpoint;

      _httpBackend.expectPOST(_endpoint, null).respond(400, _erro);

      _altPing(_endpoint)
        .then(function() {
          expect(true).toBe(false);
        })
        .catch(function(erro) {
          expect(erro.data.a).toEqual(_erro.a);
        });

      _httpBackend.flush();
    })
  });
});
