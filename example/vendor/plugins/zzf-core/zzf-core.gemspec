# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "zzf-core/version"

Gem::Specification.new do |s|
  s.name        = "zzf-core"
  s.version     = Zzf::Core::VERSION
  s.authors     = ['Ben']
  s.email       = ['ben@zfben.com']
  s.homepage    = 'https://github.com/benz303/zzf-core'

  s.rubyforge_project = "zzf-core"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
end
