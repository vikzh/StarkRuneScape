export const ethAccountAbi = [
    {
      "name": "UpgradeableImpl",
      "type": "impl",
      "interface_name": "openzeppelin::upgrades::interface::IUpgradeable"
    },
    {
      "name": "openzeppelin::upgrades::interface::IUpgradeable",
      "type": "interface",
      "items": [
        {
          "name": "upgrade",
          "type": "function",
          "inputs": [
            {
              "name": "new_class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "SRC6Impl",
      "type": "impl",
      "interface_name": "openzeppelin::account::interface::ISRC6"
    },
    {
      "name": "core::array::Span::<core::felt252>",
      "type": "struct",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::felt252>"
        }
      ]
    },
    {
      "name": "core::starknet::account::Call",
      "type": "struct",
      "members": [
        {
          "name": "to",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "selector",
          "type": "core::felt252"
        },
        {
          "name": "calldata",
          "type": "core::array::Span::<core::felt252>"
        }
      ]
    },
    {
      "name": "openzeppelin::account::interface::ISRC6",
      "type": "interface",
      "items": [
        {
          "name": "__execute__",
          "type": "function",
          "inputs": [
            {
              "name": "calls",
              "type": "core::array::Array::<core::starknet::account::Call>"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Array::<core::array::Span::<core::felt252>>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "__validate__",
          "type": "function",
          "inputs": [
            {
              "name": "calls",
              "type": "core::array::Array::<core::starknet::account::Call>"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "is_valid_signature",
          "type": "function",
          "inputs": [
            {
              "name": "hash",
              "type": "core::felt252"
            },
            {
              "name": "signature",
              "type": "core::array::Array::<core::felt252>"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "SRC6CamelOnlyImpl",
      "type": "impl",
      "interface_name": "openzeppelin::account::interface::ISRC6CamelOnly"
    },
    {
      "name": "openzeppelin::account::interface::ISRC6CamelOnly",
      "type": "interface",
      "items": [
        {
          "name": "isValidSignature",
          "type": "function",
          "inputs": [
            {
              "name": "hash",
              "type": "core::felt252"
            },
            {
              "name": "signature",
              "type": "core::array::Array::<core::felt252>"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "PublicKeyImpl",
      "type": "impl",
      "interface_name": "openzeppelin::account::interface::IEthPublicKey"
    },
    {
      "name": "openzeppelin::account::interface::IEthPublicKey",
      "type": "interface",
      "items": [
        {
          "name": "get_public_key",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::secp256k1::Secp256k1Point"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "set_public_key",
          "type": "function",
          "inputs": [
            {
              "name": "new_public_key",
              "type": "core::starknet::secp256k1::Secp256k1Point"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "PublicKeyCamelImpl",
      "type": "impl",
      "interface_name": "openzeppelin::account::interface::IEthPublicKeyCamel"
    },
    {
      "name": "openzeppelin::account::interface::IEthPublicKeyCamel",
      "type": "interface",
      "items": [
        {
          "name": "getPublicKey",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::secp256k1::Secp256k1Point"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "setPublicKey",
          "type": "function",
          "inputs": [
            {
              "name": "newPublicKey",
              "type": "core::starknet::secp256k1::Secp256k1Point"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "DeclarerImpl",
      "type": "impl",
      "interface_name": "openzeppelin::account::interface::IDeclarer"
    },
    {
      "name": "openzeppelin::account::interface::IDeclarer",
      "type": "interface",
      "items": [
        {
          "name": "__validate_declare__",
          "type": "function",
          "inputs": [
            {
              "name": "class_hash",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "DeployableImpl",
      "type": "impl",
      "interface_name": "openzeppelin::account::interface::IEthDeployable"
    },
    {
      "name": "openzeppelin::account::interface::IEthDeployable",
      "type": "interface",
      "items": [
        {
          "name": "__validate_deploy__",
          "type": "function",
          "inputs": [
            {
              "name": "class_hash",
              "type": "core::felt252"
            },
            {
              "name": "contract_address_salt",
              "type": "core::felt252"
            },
            {
              "name": "public_key",
              "type": "core::starknet::secp256k1::Secp256k1Point"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "SRC5Impl",
      "type": "impl",
      "interface_name": "openzeppelin::introspection::interface::ISRC5"
    },
    {
      "name": "core::bool",
      "type": "enum",
      "variants": [
        {
          "name": "False",
          "type": "()"
        },
        {
          "name": "True",
          "type": "()"
        }
      ]
    },
    {
      "name": "openzeppelin::introspection::interface::ISRC5",
      "type": "interface",
      "items": [
        {
          "name": "supports_interface",
          "type": "function",
          "inputs": [
            {
              "name": "interface_id",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "public_key",
          "type": "core::starknet::secp256k1::Secp256k1Point"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin::account::eth_account::EthAccountComponent::OwnerAdded",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "new_owner_guid",
          "type": "core::felt252"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin::account::eth_account::EthAccountComponent::OwnerRemoved",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "removed_owner_guid",
          "type": "core::felt252"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin::account::eth_account::EthAccountComponent::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "OwnerAdded",
          "type": "openzeppelin::account::eth_account::EthAccountComponent::OwnerAdded"
        },
        {
          "kind": "nested",
          "name": "OwnerRemoved",
          "type": "openzeppelin::account::eth_account::EthAccountComponent::OwnerRemoved"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin::introspection::src5::SRC5Component::Event",
      "type": "event",
      "variants": []
    },
    {
      "kind": "struct",
      "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "Upgraded",
          "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin::presets::eth_account::EthAccountUpgradeable::Event",
      "type": "event",
      "variants": [
        {
          "kind": "flat",
          "name": "EthAccountEvent",
          "type": "openzeppelin::account::eth_account::EthAccountComponent::Event"
        },
        {
          "kind": "flat",
          "name": "SRC5Event",
          "type": "openzeppelin::introspection::src5::SRC5Component::Event"
        },
        {
          "kind": "flat",
          "name": "UpgradeableEvent",
          "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event"
        }
      ]
    }
  ]


export const ethTokenAbi = [
    {
      "name": "MintableToken",
      "type": "impl",
      "interface_name": "src::mintable_token_interface::IMintableToken"
    },
    {
      "name": "core::integer::u256",
      "type": "struct",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "name": "src::mintable_token_interface::IMintableToken",
      "type": "interface",
      "items": [
        {
          "name": "permissioned_mint",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "permissioned_burn",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "MintableTokenCamelImpl",
      "type": "impl",
      "interface_name": "src::mintable_token_interface::IMintableTokenCamel"
    },
    {
      "name": "src::mintable_token_interface::IMintableTokenCamel",
      "type": "interface",
      "items": [
        {
          "name": "permissionedMint",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "permissionedBurn",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "Replaceable",
      "type": "impl",
      "interface_name": "src::replaceability_interface::IReplaceable"
    },
    {
      "name": "core::array::Span::<core::felt252>",
      "type": "struct",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::felt252>"
        }
      ]
    },
    {
      "name": "src::replaceability_interface::EICData",
      "type": "struct",
      "members": [
        {
          "name": "eic_hash",
          "type": "core::starknet::class_hash::ClassHash"
        },
        {
          "name": "eic_init_data",
          "type": "core::array::Span::<core::felt252>"
        }
      ]
    },
    {
      "name": "core::option::Option::<src::replaceability_interface::EICData>",
      "type": "enum",
      "variants": [
        {
          "name": "Some",
          "type": "src::replaceability_interface::EICData"
        },
        {
          "name": "None",
          "type": "()"
        }
      ]
    },
    {
      "name": "core::bool",
      "type": "enum",
      "variants": [
        {
          "name": "False",
          "type": "()"
        },
        {
          "name": "True",
          "type": "()"
        }
      ]
    },
    {
      "name": "src::replaceability_interface::ImplementationData",
      "type": "struct",
      "members": [
        {
          "name": "impl_hash",
          "type": "core::starknet::class_hash::ClassHash"
        },
        {
          "name": "eic_data",
          "type": "core::option::Option::<src::replaceability_interface::EICData>"
        },
        {
          "name": "final",
          "type": "core::bool"
        }
      ]
    },
    {
      "name": "src::replaceability_interface::IReplaceable",
      "type": "interface",
      "items": [
        {
          "name": "get_upgrade_delay",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u64"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_impl_activation_time",
          "type": "function",
          "inputs": [
            {
              "name": "implementation_data",
              "type": "src::replaceability_interface::ImplementationData"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u64"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "add_new_implementation",
          "type": "function",
          "inputs": [
            {
              "name": "implementation_data",
              "type": "src::replaceability_interface::ImplementationData"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "remove_implementation",
          "type": "function",
          "inputs": [
            {
              "name": "implementation_data",
              "type": "src::replaceability_interface::ImplementationData"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "replace_to",
          "type": "function",
          "inputs": [
            {
              "name": "implementation_data",
              "type": "src::replaceability_interface::ImplementationData"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "AccessControlImplExternal",
      "type": "impl",
      "interface_name": "src::access_control_interface::IAccessControl"
    },
    {
      "name": "src::access_control_interface::IAccessControl",
      "type": "interface",
      "items": [
        {
          "name": "has_role",
          "type": "function",
          "inputs": [
            {
              "name": "role",
              "type": "core::felt252"
            },
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_role_admin",
          "type": "function",
          "inputs": [
            {
              "name": "role",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "RolesImpl",
      "type": "impl",
      "interface_name": "src::roles_interface::IMinimalRoles"
    },
    {
      "name": "src::roles_interface::IMinimalRoles",
      "type": "interface",
      "items": [
        {
          "name": "is_governance_admin",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "is_upgrade_governor",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "register_governance_admin",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "remove_governance_admin",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "register_upgrade_governor",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "remove_upgrade_governor",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "renounce",
          "type": "function",
          "inputs": [
            {
              "name": "role",
              "type": "core::felt252"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "ERC20Impl",
      "type": "impl",
      "interface_name": "openzeppelin::token::erc20::interface::IERC20"
    },
    {
      "name": "openzeppelin::token::erc20::interface::IERC20",
      "type": "interface",
      "items": [
        {
          "name": "name",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "symbol",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "decimals",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u8"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "total_supply",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "balance_of",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "allowance",
          "type": "function",
          "inputs": [
            {
              "name": "owner",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "spender",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "transfer",
          "type": "function",
          "inputs": [
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        },
        {
          "name": "transfer_from",
          "type": "function",
          "inputs": [
            {
              "name": "sender",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        },
        {
          "name": "approve",
          "type": "function",
          "inputs": [
            {
              "name": "spender",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "ERC20CamelOnlyImpl",
      "type": "impl",
      "interface_name": "openzeppelin::token::erc20::interface::IERC20CamelOnly"
    },
    {
      "name": "openzeppelin::token::erc20::interface::IERC20CamelOnly",
      "type": "interface",
      "items": [
        {
          "name": "totalSupply",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "balanceOf",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "transferFrom",
          "type": "function",
          "inputs": [
            {
              "name": "sender",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "symbol",
          "type": "core::felt252"
        },
        {
          "name": "decimals",
          "type": "core::integer::u8"
        },
        {
          "name": "initial_supply",
          "type": "core::integer::u256"
        },
        {
          "name": "recipient",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "permitted_minter",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "provisional_governance_admin",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "upgrade_delay",
          "type": "core::integer::u64"
        }
      ]
    },
    {
      "name": "increase_allowance",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "added_value",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [
        {
          "type": "core::bool"
        }
      ],
      "state_mutability": "external"
    },
    {
      "name": "decrease_allowance",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "subtracted_value",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [
        {
          "type": "core::bool"
        }
      ],
      "state_mutability": "external"
    },
    {
      "name": "increaseAllowance",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "addedValue",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [
        {
          "type": "core::bool"
        }
      ],
      "state_mutability": "external"
    },
    {
      "name": "decreaseAllowance",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "subtractedValue",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [
        {
          "type": "core::bool"
        }
      ],
      "state_mutability": "external"
    },
    {
      "kind": "struct",
      "name": "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "from",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "to",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "value",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin::token::erc20_v070::erc20::ERC20::Approval",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "spender",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "value",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::replaceability_interface::ImplementationAdded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "implementation_data",
          "type": "src::replaceability_interface::ImplementationData"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::replaceability_interface::ImplementationRemoved",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "implementation_data",
          "type": "src::replaceability_interface::ImplementationData"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::replaceability_interface::ImplementationReplaced",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "implementation_data",
          "type": "src::replaceability_interface::ImplementationData"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::replaceability_interface::ImplementationFinalized",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "impl_hash",
          "type": "core::starknet::class_hash::ClassHash"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::access_control_interface::RoleGranted",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "role",
          "type": "core::felt252"
        },
        {
          "kind": "data",
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "sender",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::access_control_interface::RoleRevoked",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "role",
          "type": "core::felt252"
        },
        {
          "kind": "data",
          "name": "account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "sender",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::access_control_interface::RoleAdminChanged",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "role",
          "type": "core::felt252"
        },
        {
          "kind": "data",
          "name": "previous_admin_role",
          "type": "core::felt252"
        },
        {
          "kind": "data",
          "name": "new_admin_role",
          "type": "core::felt252"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::roles_interface::GovernanceAdminAdded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "added_account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "added_by",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::roles_interface::GovernanceAdminRemoved",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "removed_account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "removed_by",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::roles_interface::UpgradeGovernorAdded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "added_account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "added_by",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "src::roles_interface::UpgradeGovernorRemoved",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "removed_account",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "removed_by",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin::token::erc20_v070::erc20::ERC20::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "Transfer",
          "type": "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer"
        },
        {
          "kind": "nested",
          "name": "Approval",
          "type": "openzeppelin::token::erc20_v070::erc20::ERC20::Approval"
        },
        {
          "kind": "nested",
          "name": "ImplementationAdded",
          "type": "src::replaceability_interface::ImplementationAdded"
        },
        {
          "kind": "nested",
          "name": "ImplementationRemoved",
          "type": "src::replaceability_interface::ImplementationRemoved"
        },
        {
          "kind": "nested",
          "name": "ImplementationReplaced",
          "type": "src::replaceability_interface::ImplementationReplaced"
        },
        {
          "kind": "nested",
          "name": "ImplementationFinalized",
          "type": "src::replaceability_interface::ImplementationFinalized"
        },
        {
          "kind": "nested",
          "name": "RoleGranted",
          "type": "src::access_control_interface::RoleGranted"
        },
        {
          "kind": "nested",
          "name": "RoleRevoked",
          "type": "src::access_control_interface::RoleRevoked"
        },
        {
          "kind": "nested",
          "name": "RoleAdminChanged",
          "type": "src::access_control_interface::RoleAdminChanged"
        },
        {
          "kind": "nested",
          "name": "GovernanceAdminAdded",
          "type": "src::roles_interface::GovernanceAdminAdded"
        },
        {
          "kind": "nested",
          "name": "GovernanceAdminRemoved",
          "type": "src::roles_interface::GovernanceAdminRemoved"
        },
        {
          "kind": "nested",
          "name": "UpgradeGovernorAdded",
          "type": "src::roles_interface::UpgradeGovernorAdded"
        },
        {
          "kind": "nested",
          "name": "UpgradeGovernorRemoved",
          "type": "src::roles_interface::UpgradeGovernorRemoved"
        }
      ]
    }
  ]

export const resourceAbi = [
    {
      "type": "struct",
      "name": "core::integer::u256",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "type": "function",
      "name": "mint",
      "inputs": [
        {
          "name": "recipient",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "amount",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "type": "impl",
      "name": "ERC20MixinImpl",
      "interface_name": "openzeppelin_token::erc20::interface::ERC20ABI"
    },
    {
      "type": "enum",
      "name": "core::bool",
      "variants": [
        {
          "name": "False",
          "type": "()"
        },
        {
          "name": "True",
          "type": "()"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::byte_array::ByteArray",
      "members": [
        {
          "name": "data",
          "type": "core::array::Array::<core::bytes_31::bytes31>"
        },
        {
          "name": "pending_word",
          "type": "core::felt252"
        },
        {
          "name": "pending_word_len",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "interface",
      "name": "openzeppelin_token::erc20::interface::ERC20ABI",
      "items": [
        {
          "type": "function",
          "name": "total_supply",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "balance_of",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "allowance",
          "inputs": [
            {
              "name": "owner",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "spender",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "transfer",
          "inputs": [
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "transfer_from",
          "inputs": [
            {
              "name": "sender",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "approve",
          "inputs": [
            {
              "name": "spender",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "name",
          "inputs": [],
          "outputs": [
            {
              "type": "core::byte_array::ByteArray"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "symbol",
          "inputs": [],
          "outputs": [
            {
              "type": "core::byte_array::ByteArray"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "decimals",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u8"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "totalSupply",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "balanceOf",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "transferFrom",
          "inputs": [
            {
              "name": "sender",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "impl",
      "name": "OwnableMixinImpl",
      "interface_name": "openzeppelin_access::ownable::interface::OwnableABI"
    },
    {
      "type": "interface",
      "name": "openzeppelin_access::ownable::interface::OwnableABI",
      "items": [
        {
          "type": "function",
          "name": "owner",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "transfer_ownership",
          "inputs": [
            {
              "name": "new_owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "renounce_ownership",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "transferOwnership",
          "inputs": [
            {
              "name": "newOwner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "renounceOwnership",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
      "kind": "struct",
      "members": [
        {
          "name": "from",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "to",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "value",
          "type": "core::integer::u256",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
      "kind": "struct",
      "members": [
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "spender",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "value",
          "type": "core::integer::u256",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc20::erc20::ERC20Component::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "Transfer",
          "type": "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
          "kind": "nested"
        },
        {
          "name": "Approval",
          "type": "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      "kind": "struct",
      "members": [
        {
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      "kind": "struct",
      "members": [
        {
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "OwnershipTransferred",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          "kind": "nested"
        },
        {
          "name": "OwnershipTransferStarted",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "src::WOODERC20::StarkRougeWood::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "ERC20Event",
          "type": "openzeppelin_token::erc20::erc20::ERC20Component::Event",
          "kind": "flat"
        },
        {
          "name": "OwnableEvent",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
          "kind": "flat"
        }
      ]
    }
  ]